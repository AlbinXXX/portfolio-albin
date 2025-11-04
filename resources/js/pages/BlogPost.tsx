import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import FaultyTerminal from '@/components/FaultyTerminal';
import SpotlightCard from '@/components/SpotlightCard';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
    author: string;
    category?: string;
    featuredImage?: string;
}

interface BlogPostProps {
    post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
    return (
        <MainLayout>
            <Head title={`${post.title} - Albin Rushiti`} />

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
                
                <div className="relative z-20 flex-1 px-6 py-20 mt-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <Link href="/blog">
                                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 mb-6">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Blog
                                </Button>
                            </Link>
                        </div>

                        <SpotlightCard 
                            className="mb-8"
                            spotlightColor="rgba(167, 239, 158, 0.1)"
                        >
                            <article className="prose prose-invert max-w-none">
                                <div className="mb-6">
                                    <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
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
                                    
                                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                                        {post.title}
                                    </h1>
                                    
                                    <p className="text-lg text-white/80 mb-6">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
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
                                </div>

                                <div 
                                    className="text-white/90 leading-relaxed prose prose-invert prose-lg max-w-none
                                               prose-headings:text-white prose-headings:font-bold
                                               prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                                               prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:text-primary
                                               prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5 prose-h3:text-white/90
                                               prose-p:text-white/80 prose-p:mb-4 prose-p:leading-7
                                               prose-ul:text-white/80 prose-ol:text-white/80
                                               prose-li:mb-2 prose-li:text-white/80
                                               prose-strong:text-white prose-strong:font-semibold
                                               prose-code:bg-white/10 prose-code:text-primary prose-code:px-2 prose-code:py-1 prose-code:rounded
                                               prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/20 prose-pre:rounded-lg prose-pre:p-4
                                               prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white/70
                                               prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </article>
                        </SpotlightCard>

                        <div className="text-center">
                            <SpotlightCard 
                                className="text-center"
                                spotlightColor="rgba(167, 239, 158, 0.15)"
                            >
                                <h2 className="text-2xl font-semibold mb-4 text-white">
                                    Enjoyed this article?
                                </h2>
                                <p className="text-white/80 mb-6 max-w-lg mx-auto">
                                    Let's connect and discuss your next project or just say hello!
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Link href="/contact">
                                        <Button size="lg">
                                            Get In Touch
                                        </Button>
                                    </Link>
                                    <Link href="/blog">
                                        <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                                            More Articles
                                        </Button>
                                    </Link>
                                </div>
                            </SpotlightCard>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}