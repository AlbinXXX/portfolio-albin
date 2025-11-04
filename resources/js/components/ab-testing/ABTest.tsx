import React from 'react';
import { useABTest } from '@/lib/ab-testing';

interface ABTestProps {
    testId: string;
    children: Record<string, React.ReactNode>;
    fallback?: React.ReactNode;
    onConversion?: (variant: string) => void;
}

/**
 * A/B Test Wrapper Component
 * 
 * Usage:
 * <ABTest testId="homepage-hero" fallback={<DefaultHero />}>
 *   {{
 *     'control': <HeroV1 />,
 *     'variant-a': <HeroV2 />,
 *     'variant-b': <HeroV3 />
 *   }}
 * </ABTest>
 */
export function ABTest({ testId, children, fallback, onConversion }: ABTestProps) {
    const { variant, trackConversion, isLoading } = useABTest(testId);

    // Track conversion when onConversion is called
    const handleConversion = () => {
        if (variant) {
            trackConversion();
            onConversion?.(variant);
        }
    };

    if (isLoading) {
        return fallback ? <>{fallback}</> : null;
    }

    if (!variant || !children[variant]) {
        return fallback ? <>{fallback}</> : null;
    }

    // Clone the element and add conversion tracking if it has onClick
    const content = children[variant];
    if (React.isValidElement(content)) {
        const props = content.props as any;
        if (props.onClick) {
            return React.cloneElement(content as React.ReactElement<any>, {
                ...props,
                onClick: (...args: any[]) => {
                    props.onClick?.(...args);
                    handleConversion();
                },
            });
        }
    }

    return <>{content}</>;
}

interface ABTestButtonProps {
    testId: string;
    variants: Record<string, {
        text: string;
        variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
        size?: 'default' | 'sm' | 'lg' | 'icon';
        className?: string;
    }>;
    onClick?: () => void;
    fallback?: React.ReactNode;
    className?: string;
}

/**
 * A/B Test Button Component
 * 
 * Usage:
 * <ABTestButton 
 *   testId="cta-button"
 *   variants={{
 *     'control': { text: 'Sign Up', variant: 'default' },
 *     'variant-a': { text: 'Get Started', variant: 'outline' },
 *     'variant-b': { text: 'Join Now', variant: 'destructive' }
 *   }}
 *   onClick={() => router.visit('/register')}
 * />
 */
export function ABTestButton({ 
    testId, 
    variants, 
    onClick, 
    fallback, 
    className = '' 
}: ABTestButtonProps) {
    const { variant, trackConversion, isLoading } = useABTest(testId);

    const handleClick = () => {
        trackConversion();
        onClick?.();
    };

    if (isLoading) {
        return fallback ? <>{fallback}</> : null;
    }

    if (!variant || !variants[variant]) {
        return fallback ? <>{fallback}</> : null;
    }

    const variantConfig = variants[variant];

    return (
        <button
            onClick={handleClick}
            className={`
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium 
                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                disabled:opacity-50
                ${variantConfig.variant === 'default' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
                ${variantConfig.variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
                ${variantConfig.variant === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : ''}
                ${variantConfig.variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''}
                ${variantConfig.variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : ''}
                ${variantConfig.variant === 'link' ? 'text-primary underline-offset-4 hover:underline' : ''}
                ${variantConfig.size === 'sm' ? 'h-9 rounded-md px-3' : ''}
                ${variantConfig.size === 'lg' ? 'h-11 rounded-md px-8' : ''}
                ${variantConfig.size === 'icon' ? 'h-10 w-10' : ''}
                ${!variantConfig.size || variantConfig.size === 'default' ? 'h-10 px-4 py-2' : ''}
                ${variantConfig.className || ''}
                ${className}
            `}
        >
            {variantConfig.text}
        </button>
    );
}

interface ABTestTextProps {
    testId: string;
    variants: Record<string, string>;
    tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    fallback?: React.ReactNode;
}

/**
 * A/B Test Text Component
 * 
 * Usage:
 * <ABTestText
 *   testId="hero-headline"
 *   variants={{
 *     'control': 'Build Amazing Web Apps',
 *     'variant-a': 'Create Stunning Websites',
 *     'variant-b': 'Develop Modern Applications'
 *   }}
 *   tag="h1"
 *   className="text-4xl font-bold"
 * />
 */
export function ABTestText({ 
    testId, 
    variants, 
    tag: Tag = 'span', 
    className = '', 
    fallback 
}: ABTestTextProps) {
    const { variant, isLoading } = useABTest(testId);

    if (isLoading) {
        return fallback ? <>{fallback}</> : null;
    }

    if (!variant || !variants[variant]) {
        return fallback ? <>{fallback}</> : null;
    }

    return <Tag className={className}>{variants[variant]}</Tag>;
}

interface ABTestImageProps {
    testId: string;
    variants: Record<string, {
        src: string;
        alt: string;
        className?: string;
    }>;
    className?: string;
    fallback?: React.ReactNode;
}

/**
 * A/B Test Image Component
 * 
 * Usage:
 * <ABTestImage
 *   testId="hero-image"
 *   variants={{
 *     'control': { src: '/images/hero-v1.jpg', alt: 'Hero Image V1' },
 *     'variant-a': { src: '/images/hero-v2.jpg', alt: 'Hero Image V2' }
 *   }}
 *   className="w-full h-64 object-cover"
 * />
 */
export function ABTestImage({ 
    testId, 
    variants, 
    className = '', 
    fallback 
}: ABTestImageProps) {
    const { variant, isLoading } = useABTest(testId);

    if (isLoading) {
        return fallback ? <>{fallback}</> : null;
    }

    if (!variant || !variants[variant]) {
        return fallback ? <>{fallback}</> : null;
    }

    const variantConfig = variants[variant];

    return (
        <img
            src={variantConfig.src}
            alt={variantConfig.alt}
            className={`${variantConfig.className || ''} ${className}`}
            loading="lazy"
        />
    );
}