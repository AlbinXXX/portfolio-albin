import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import FaultyTerminal from '@/components/FaultyTerminal';
import SpotlightCard from '@/components/SpotlightCard';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
    author: string;
    category?: string;
}

interface BlogIndexProps {
    posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
    return (
        <MainLayout>
            <Head title="Blog - Albin Rushiti" />

            {/* Blog Section with FaultyTerminal Background */}
            <section className="min-h-screen relative flex flex-col overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <FaultyTerminal 
                        scale={1.5}
                        gridMul={[2, 1]}
                        digitSize={1.2}
                        timeScale={0.5}
                        noiseAmp={1}
                        brightness={0.6}
                        scanlineIntensity={0.5}
                        curvature={0.1}
                        mouseStrength={0.5}
                        mouseReact={true}
                        pageLoadAnimation={true}
                        tint="#a7ef9e"
                        glitchAmount={1}
                        flickerAmount={1}
                        chromaticAberration={0}
                        dither={false}
                        style={{ 
                            width: '100%', 
                            height: '100%'
                        }}
                    />
                </div>
                
                {/* Content */}
                <div className="relative z-20 flex-1 px-6 py-20 flex flex-col justify-center min-h-screen mt-20">
                    <div className="max-w-7xl mx-auto text-center">
                        {/* Header */}
                        <div className="mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                                Blog
                            </h1>
                            <p className="text-lg md:text-xl text-white font-mono">
                                SELECT * FROM thoughts WHERE topic = 'web_development' ORDER BY publish_date DESC;
                            </p>
                        </div>

                        {/* Blog Posts Grid */}
                        <div className="grid gap-8 max-w-5xl mx-auto mb-16">
                            {posts.map((post) => (
                                <SpotlightCard 
                                    key={post.id} 
                                    className="text-left hover:scale-[1.02] transition-transform duration-300"
                                    spotlightColor="rgba(167, 239, 158, 0.1)"
                                >
                                    <div className="mb-4">
                                        <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                {post.author}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(post.publishedAt).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                        
                                        <h2 className="text-2xl font-bold mb-4 text-white hover:text-primary transition-colors">
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h2>
                                        
                                        <p className="text-white/80 text-base mb-6">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <Badge 
                                                    key={tag} 
                                                    variant="secondary"
                                                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        
                                        <Link href={`/blog/${post.slug}`}>
                                            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                                                Read More
                                            </Button>
                                        </Link>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div>
                            <SpotlightCard 
                                className="text-center"
                                spotlightColor="rgba(167, 239, 158, 0.15)"
                            >
                                <h2 className="text-2xl font-semibold mb-4 text-white">
                                    Want to stay updated?
                                </h2>
                                <p className="text-white/80 mb-6 max-w-lg mx-auto">
                                    Subscribe to get notified about new articles and insights on modern web development.
                                </p>
                                <Link href="/contact">
                                    <Button size="lg">
                                        Get In Touch
                                    </Button>
                                </Link>
                            </SpotlightCard>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
