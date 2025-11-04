import { Head } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CalendarIcon, TrendingUpIcon, UsersIcon, TargetIcon } from 'lucide-react';

interface ABTestResult {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'completed' | 'draft';
    start_date: string;
    end_date: string | null;
    variants: {
        variant_name: string;
        assignments: number;
        conversions: number;
        conversion_rate: number;
    }[];
    total_assignments: number;
    total_conversions: number;
    overall_conversion_rate: number;
}

async function fetchABTestResults(): Promise<ABTestResult[]> {
    const response = await fetch('/api/ab-tests');
    if (!response.ok) {
        throw new Error('Failed to fetch A/B test results');
    }
    return response.json();
}

function StatusBadge({ status }: { status: string }) {
    const variants = {
        active: 'bg-green-100 text-green-800 border-green-200',
        completed: 'bg-blue-100 text-blue-800 border-blue-200',
        draft: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
        <Badge className={variants[status as keyof typeof variants] || variants.draft}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
}

function VariantCard({ variant, isWinning }: { 
    variant: ABTestResult['variants'][0]; 
    isWinning: boolean;
}) {
    return (
        <div className={`p-4 rounded-lg border-2 ${isWinning ? 'border-green-500 bg-green-50' : 'border-border bg-card'}`}>
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium capitalize">
                    {variant.variant_name.replace('-', ' ')}
                </h4>
                {isWinning && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                        Leading
                    </Badge>
                )}
            </div>
            
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Visitors:</span>
                    <span className="font-medium">{variant.assignments}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Conversions:</span>
                    <span className="font-medium">{variant.conversions}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Conversion Rate:</span>
                    <span className="font-bold text-primary">
                        {(variant.conversion_rate * 100).toFixed(2)}%
                    </span>
                </div>
                <Progress value={variant.conversion_rate * 100} className="h-2" />
            </div>
        </div>
    );
}

export default function ABTestAnalytics() {
    const { data: tests, isLoading, error } = useQuery({
        queryKey: ['ab-tests'],
        queryFn: fetchABTestResults,
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Head title="A/B Test Analytics" />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Loading analytics...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background">
                <Head title="A/B Test Analytics" />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <p className="text-destructive">Failed to load analytics data</p>
                        <Button 
                            onClick={() => window.location.reload()} 
                            className="mt-4"
                        >
                            Retry
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title="A/B Test Analytics" />
            
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="border-b bg-card">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                    A/B Test Analytics
                                </h1>
                                <p className="text-muted-foreground mt-2">
                                    Monitor your experiments and optimize conversion rates
                                </p>
                            </div>
                            <Button onClick={() => window.location.href = '/ab-test-demo'}>
                                View Demo
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-8">
                    {/* Overview Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
                                <TargetIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {tests?.filter(t => t.status === 'active')?.length || 0}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                                <UsersIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {tests?.reduce((sum, test) => sum + (test.total_assignments || 0), 0) || 0}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
                                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {tests?.reduce((sum, test) => sum + (test.total_conversions || 0), 0) || 0}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Avg. Conversion Rate</CardTitle>
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {tests && tests.length > 0 
                                        ? (tests.reduce((sum, test) => sum + (test.overall_conversion_rate || 0), 0) / tests.length * 100).toFixed(2)
                                        : 0
                                    }%
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Test Results */}
                    <div className="space-y-6">
                        {tests && tests.length > 0 ? (
                            tests.map((test) => {
                                const winningVariant = test.variants && test.variants.length > 0 
                                    ? test.variants.reduce((prev, current) => 
                                        prev.conversion_rate > current.conversion_rate ? prev : current
                                    ) 
                                    : null;

                                return (
                                    <Card key={test.id}>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle className="text-xl">{test.name}</CardTitle>
                                                    <CardDescription className="mt-2">
                                                        {test.description}
                                                    </CardDescription>
                                                </div>
                                                <StatusBadge status={test.status} />
                                            </div>
                                            
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>Started: {new Date(test.start_date).toLocaleDateString()}</span>
                                                {test.end_date && (
                                                    <span>Ended: {new Date(test.end_date).toLocaleDateString()}</span>
                                                )}
                                                <span>Visitors: {test.total_assignments}</span>
                                                <span>Conversions: {test.total_conversions}</span>
                                            </div>
                                        </CardHeader>
                                        
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {test.variants.map((variant) => (
                                                    <VariantCard
                                                        key={variant.variant_name}
                                                        variant={variant}
                                                        isWinning={Boolean(winningVariant && variant.variant_name === winningVariant.variant_name && test.variants.length > 1)}
                                                    />
                                                ))}
                                            </div>
                                            
                                            {test.variants.length > 1 && winningVariant && (
                                                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                                                    <h5 className="font-medium text-sm mb-2">Key Insights:</h5>
                                                    <ul className="text-sm text-muted-foreground space-y-1">
                                                        <li>
                                                            • <strong>{winningVariant.variant_name.replace('-', ' ')}</strong> is currently leading 
                                                            with {(winningVariant.conversion_rate * 100).toFixed(2)}% conversion rate
                                                        </li>
                                                        <li>
                                                            • Overall test conversion rate: {(test.overall_conversion_rate * 100).toFixed(2)}%
                                                        </li>
                                                        <li>
                                                            • Statistical significance analysis requires more data for reliable conclusions
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })
                        ) : (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <TargetIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No A/B Tests Found</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Start by creating your first A/B test to begin optimizing your conversion rates.
                                    </p>
                                    <Button onClick={() => window.location.href = '/ab-test-demo'}>
                                        View Demo
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}