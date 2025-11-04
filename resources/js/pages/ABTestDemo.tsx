import { Head } from '@inertiajs/react';
import { ABTest, ABTestButton, ABTestText, ABTestImage } from '@/components/ab-testing/ABTest';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

export default function ABTestDemo() {
    return (
        <>
            <Head title="A/B Test Demo" />
            
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="border-b bg-card">
                    <div className="container mx-auto px-4 py-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-foreground">
                                A/B Testing Demo
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                                Experience different variants based on your session. Refresh the page to see different content!
                            </p>
                        </div>
                    </div>
                </header>

                {/* Hero Section A/B Test */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <ABTestText
                                testId="homepage-hero"
                                variants={{
                                    'control': 'Build Amazing Web Applications',
                                    'variant-a': 'Transform Your Ideas Into Digital Reality',
                                    'variant-b': 'Ready to Create Something Extraordinary?'
                                }}
                                tag="h2"
                                className="text-5xl font-bold tracking-tight text-foreground mb-6"
                                fallback={<h2 className="text-5xl font-bold tracking-tight text-foreground mb-6">Build Amazing Web Applications</h2>}
                            />
                            
                            <ABTestText
                                testId="homepage-hero"
                                variants={{
                                    'control': 'Professional web development services with modern technologies and clean, maintainable code.',
                                    'variant-a': 'We turn complex business requirements into elegant, scalable solutions that drive results.',
                                    'variant-b': 'What if your next project could exceed every expectation? Let\'s find out together.'
                                }}
                                tag="p"
                                className="mx-auto max-w-3xl text-xl text-muted-foreground mb-8"
                                fallback={<p className="mx-auto max-w-3xl text-xl text-muted-foreground mb-8">Professional web development services with modern technologies.</p>}
                            />

                            <div className="flex gap-4 justify-center">
                                <ABTestButton
                                    testId="homepage-hero"
                                    variants={{
                                        'control': { text: 'Get Started', variant: 'default', size: 'lg' },
                                        'variant-a': { text: 'Start Your Project', variant: 'default', size: 'lg' },
                                        'variant-b': { text: 'Let\'s Begin', variant: 'outline', size: 'lg' }
                                    }}
                                    onClick={() => {
                                        // This click will be tracked as a conversion
                                        router.visit('/contact');
                                    }}
                                    fallback={<Button size="lg" onClick={() => router.visit('/contact')}>Get Started</Button>}
                                />
                                
                                <Button variant="outline" size="lg" onClick={() => router.visit('/contact')}>
                                    View Portfolio
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA A/B Test */}
                <section className="py-16 bg-muted/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <h3 className="text-3xl font-semibold text-foreground mb-4">
                                Ready to Work Together?
                            </h3>
                            <p className="text-lg text-muted-foreground mb-8">
                                Let's discuss your project and see how we can help you achieve your goals.
                            </p>
                            
                            <ABTestButton
                                testId="contact-cta"
                                variants={{
                                    'control': { text: 'Get In Touch', variant: 'default', size: 'lg' },
                                    'variant-a': { text: 'Let\'s Talk', variant: 'destructive', size: 'lg' }
                                }}
                                onClick={() => {
                                    // This click will be tracked as a conversion
                                    router.visit('/contact');
                                }}
                                fallback={<Button size="lg" onClick={() => router.visit('/contact')}>Get In Touch</Button>}
                            />
                        </div>
                    </div>
                </section>

                {/* Complex A/B Test Example */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <ABTest
                            testId="homepage-hero"
                            fallback={
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-4">Default Content</h3>
                                        <p className="text-muted-foreground">This is the fallback content when no A/B test is active.</p>
                                    </div>
                                    <div className="bg-muted rounded-lg p-8">
                                        <div className="w-full h-48 bg-primary/20 rounded"></div>
                                    </div>
                                </div>
                            }
                        >
                            {{
                                'control': (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-4">Control Version</h3>
                                            <p className="text-muted-foreground mb-6">
                                                This is the original design that we're testing against. 
                                                It represents our current best understanding of what works.
                                            </p>
                                            <Button onClick={() => router.visit('/contact')}>
                                                Standard CTA
                                            </Button>
                                        </div>
                                        <div className="bg-muted rounded-lg p-8">
                                            <div className="w-full h-48 bg-blue-500/20 rounded"></div>
                                        </div>
                                    </div>
                                ),
                                'variant-a': (
                                    <div className="text-center">
                                        <h3 className="text-3xl font-bold mb-4">Variant A - Bold Approach</h3>
                                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                            This variant uses a more aggressive, bold design to capture attention 
                                            and drive immediate action.
                                        </p>
                                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-12 text-white">
                                            <h4 className="text-2xl font-bold mb-4">Eye-Catching Design</h4>
                                            <Button 
                                                variant="secondary" 
                                                size="lg"
                                                onClick={() => router.visit('/contact')}
                                            >
                                                Take Action Now
                                            </Button>
                                        </div>
                                    </div>
                                ),
                                'variant-b': (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="col-span-2">
                                            <h3 className="text-2xl font-semibold mb-4">Variant B - Question-Driven</h3>
                                            <div className="space-y-4">
                                                <div className="border-l-4 border-primary pl-4">
                                                    <p className="font-medium">What makes a great web application?</p>
                                                    <p className="text-sm text-muted-foreground">Performance, usability, and scalability.</p>
                                                </div>
                                                <div className="border-l-4 border-primary pl-4">
                                                    <p className="font-medium">How do we achieve this?</p>
                                                    <p className="text-sm text-muted-foreground">Through careful planning and modern tech.</p>
                                                </div>
                                                <div className="border-l-4 border-primary pl-4">
                                                    <p className="font-medium">Ready to get started?</p>
                                                    <Button 
                                                        className="mt-2" 
                                                        size="sm"
                                                        onClick={() => router.visit('/contact')}
                                                    >
                                                        Discover How
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-muted rounded-lg p-6">
                                            <div className="w-full h-32 bg-green-500/20 rounded mb-4"></div>
                                            <p className="text-sm text-muted-foreground text-center">
                                                Interactive elements guide users through the journey
                                            </p>
                                        </div>
                                    </div>
                                )
                            }}
                        </ABTest>
                    </div>
                </section>

                {/* Debug Information */}
                <section className="py-8 bg-muted/30 border-t">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-sm text-muted-foreground">
                            <p className="mb-2">
                                <strong>Debug Info:</strong> This demo uses real A/B testing functionality.
                                Each visitor gets assigned to variants based on their session ID.
                            </p>
                            <p>
                                Conversion tracking happens when you click the CTA buttons.
                                Open the browser dev tools to see the tracking requests in the Network tab.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}