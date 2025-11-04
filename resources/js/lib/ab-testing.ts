import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from '@inertiajs/react';

export interface ABTestConfig {
    id: string;
    name: string;
    variants: {
        id: string;
        name: string;
        weight: number; // 0-100, should sum to 100 across variants
    }[];
    active: boolean;
    description?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface ABTestAssignment {
    testId: string;
    variantId: string;
    userId?: string;
    sessionId: string;
    assignedAt: Date;
}

export interface ABTestMetrics {
    testId: string;
    variantId: string;
    conversions: number;
    views: number;
    conversionRate: number;
}

// Local storage keys
const AB_STORAGE_KEY = 'ab_test_assignments';
const AB_SESSION_KEY = 'ab_session_id';

// Generate or get session ID
function getSessionId(): string {
    let sessionId = localStorage.getItem(AB_SESSION_KEY);
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem(AB_SESSION_KEY, sessionId);
    }
    return sessionId;
}

// Get stored assignments
function getStoredAssignments(): Record<string, ABTestAssignment> {
    try {
        const stored = localStorage.getItem(AB_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

// Store assignment
function storeAssignment(assignment: ABTestAssignment): void {
    try {
        const assignments = getStoredAssignments();
        assignments[assignment.testId] = assignment;
        localStorage.setItem(AB_STORAGE_KEY, JSON.stringify(assignments));
    } catch (error) {
        console.warn('Failed to store A/B test assignment:', error);
    }
}

// Assign user to variant based on weights
function assignVariant(test: ABTestConfig, sessionId: string): string {
    // Use session ID to create deterministic assignment
    const hash = hashString(sessionId + test.id);
    const random = (hash % 100) + 1; // 1-100
    
    let cumulativeWeight = 0;
    for (const variant of test.variants) {
        cumulativeWeight += variant.weight;
        if (random <= cumulativeWeight) {
            return variant.id;
        }
    }
    
    // Fallback to first variant
    return test.variants[0].id;
}

// Simple string hash function
function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

// Track event to backend
async function trackABEvent(
    testId: string,
    variantId: string,
    event: 'view' | 'conversion',
    metadata?: Record<string, any>
): Promise<void> {
    try {
        await fetch('/api/ab-tests/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
                test_id: testId,
                variant_id: variantId,
                event,
                session_id: getSessionId(),
                metadata,
            }),
        });
    } catch (error) {
        console.warn('Failed to track A/B test event:', error);
    }
}

export class ABTestManager {
    private static instance: ABTestManager;
    private tests: Map<string, ABTestConfig> = new Map();
    private assignments: Map<string, ABTestAssignment> = new Map();

    static getInstance(): ABTestManager {
        if (!ABTestManager.instance) {
            ABTestManager.instance = new ABTestManager();
        }
        return ABTestManager.instance;
    }

    // Register a test configuration
    registerTest(config: ABTestConfig): void {
        this.tests.set(config.id, config);
    }

    // Get variant for a test
    getVariant(testId: string): string | null {
        const test = this.tests.get(testId);
        if (!test || !test.active) {
            return null;
        }

        // Check if user already has assignment
        let assignment = this.assignments.get(testId) || getStoredAssignments()[testId];
        
        if (!assignment) {
            // Create new assignment
            const sessionId = getSessionId();
            const variantId = assignVariant(test, sessionId);
            
            assignment = {
                testId,
                variantId,
                sessionId,
                assignedAt: new Date(),
            };
            
            this.assignments.set(testId, assignment);
            storeAssignment(assignment);
            
            // Track view
            trackABEvent(testId, variantId, 'view');
        }
        
        return assignment.variantId;
    }

    // Track conversion
    trackConversion(testId: string, metadata?: Record<string, any>): void {
        const assignment = this.assignments.get(testId) || getStoredAssignments()[testId];
        if (assignment) {
            trackABEvent(testId, assignment.variantId, 'conversion', metadata);
        }
    }

    // Get all active tests
    getActiveTests(): ABTestConfig[] {
        return Array.from(this.tests.values()).filter(test => test.active);
    }
}

// React hook for A/B testing
export function useABTest(testId: string): {
    variant: string | null;
    trackConversion: (metadata?: Record<string, any>) => void;
    isLoading: boolean;
} {
    const manager = ABTestManager.getInstance();
    
    // Get test configuration from server
    const { data: testConfig, isLoading } = useQuery({
        queryKey: ['ab-test-config', testId],
        queryFn: async (): Promise<ABTestConfig> => {
            const response = await fetch(`/api/ab-tests/${testId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch test config');
            }
            return await response.json();
        },
        staleTime: 1000 * 60 * 10, // 10 minutes
        retry: false,
    });

    // Register test when config is loaded
    if (testConfig) {
        manager.registerTest(testConfig);
    }

    const variant = testConfig ? manager.getVariant(testId) : null;

    const trackConversion = (metadata?: Record<string, any>) => {
        manager.trackConversion(testId, metadata);
    };

    return {
        variant,
        trackConversion,
        isLoading,
    };
}

// Hook for getting A/B test metrics
export function useABTestMetrics(testId: string) {
    return useQuery({
        queryKey: ['ab-test-metrics', testId],
        queryFn: async (): Promise<ABTestMetrics[]> => {
            const response = await fetch(`/api/ab-tests/${testId}/metrics`);
            if (!response.ok) {
                throw new Error('Failed to fetch test metrics');
            }
            return await response.json();
        },
        refetchInterval: 30000, // Refresh every 30 seconds
    });
}

// Hook for managing A/B tests
export function useABTestMutations() {
    const queryClient = useQueryClient();

    const createTest = useMutation({
        mutationFn: async (config: Omit<ABTestConfig, 'id'>) => {
            return new Promise((resolve, reject) => {
                router.post('/admin/ab-tests', config, {
                    onSuccess: (data) => resolve(data),
                    onError: (errors) => reject(errors),
                });
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ab-tests'] });
        },
    });

    const updateTest = useMutation({
        mutationFn: async ({ id, ...config }: ABTestConfig) => {
            return new Promise((resolve, reject) => {
                router.put(`/admin/ab-tests/${id}`, config, {
                    onSuccess: (data) => resolve(data),
                    onError: (errors) => reject(errors),
                });
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ab-tests'] });
        },
    });

    const deleteTest = useMutation({
        mutationFn: async (id: string) => {
            return new Promise((resolve, reject) => {
                router.delete(`/admin/ab-tests/${id}`, {
                    onSuccess: () => resolve(id),
                    onError: (errors) => reject(errors),
                });
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ab-tests'] });
        },
    });

    return {
        createTest,
        updateTest,
        deleteTest,
    };
}