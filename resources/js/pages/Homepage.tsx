import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import FaultyTerminal from '@/components/FaultyTerminal';
import PixelCard from '@/components/PixelCard';
import LogoLoop from '@/components/LogoLoop';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { socialLinks } from '@/config/socialLinks';
import { 
    SiReact, 
    SiNextdotjs, 
    SiTypescript, 
    SiTailwindcss,
    SiLaravel,
    SiPhp,
    SiPython,
    SiNodedotjs,
    SiPostgresql,
    SiMysql,
    SiDocker,
    SiAmazon,
    SiVuedotjs,
    SiNuxtdotjs,
    SiGraphql,
    SiRedis,
    SiGit,
    SiLinux,
    SiNginx,
    SiJavascript
} from 'react-icons/si';
import MainLayout from '@/components/layouts/MainLayout';

const techLogos = [
    { node: <SiReact className="text-white" />, title: "React", href: "https://react.dev" },
    { node: <SiLaravel className="text-white" />, title: "Laravel", href: "https://laravel.com" },
    { node: <SiNextdotjs className="text-white" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="text-white" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiPhp className="text-white" />, title: "PHP", href: "https://php.net" },
    { node: <SiPython className="text-white" />, title: "Python", href: "https://python.org" },
    { node: <SiNodedotjs className="text-white" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiVuedotjs className="text-white" />, title: "Vue.js", href: "https://vuejs.org" },
    { node: <SiNuxtdotjs className="text-white" />, title: "Nuxt.js", href: "https://nuxt.com" },
    { node: <SiTailwindcss className="text-white" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiPostgresql className="text-white" />, title: "PostgreSQL", href: "https://postgresql.org" },
    { node: <SiMysql className="text-white" />, title: "MySQL", href: "https://mysql.com" },
    { node: <SiDocker className="text-white" />, title: "Docker", href: "https://docker.com" },
    { node: <SiAmazon className="text-white" />, title: "AWS", href: "https://aws.amazon.com" },
    { node: <SiGraphql className="text-white" />, title: "GraphQL", href: "https://graphql.org" },
    { node: <SiRedis className="text-white" />, title: "Redis", href: "https://redis.io" },
    { node: <SiGit className="text-white" />, title: "Git", href: "https://git-scm.com" },
    { node: <SiLinux className="text-white" />, title: "Linux", href: "https://kernel.org" },
    { node: <SiNginx className="text-white" />, title: "Nginx", href: "https://nginx.org" },
    { node: <SiJavascript className="text-white" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
];

export default function Homepage() {
    const { auth } = usePage<SharedData>().props;

    return (
        <MainLayout>
            <Head title="Albin Rushiti - Full Stack Developer" />
            
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
                
                <div className="relative z-20 flex items-center justify-center flex-1 px-6 pt-24 sm:pt-28">
                    <div className="flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto text-center">
                        {/* Main heading first */}
                        <div className="max-w-3xl">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                                Full Stack Developer
                            </h1>
                            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed font-mono">
                                SELECT * FROM skills WHERE expertise = 'Laravel' AND frontend = 'React' AND experience = 'Tech Lead' AND passion &gt; 9000;
                            </p>
                        </div>

                        {/* Smaller image below heading with spacing */}
                        <div className="mt-8">
                            <PixelCard
                                variant="blue"
                                className="w-64 h-80 overflow-hidden mx-auto"
                                speed={40}
                                gap={3}
                                colors="#e0f2fe,#7dd3fc,#0ea5e9,#ffffff"
                            >
                                <div className="absolute inset-0 z-0">
                                    <img 
                                        src="/Photo.jpg" 
                                        alt="Albin Rushiti - Full Stack Developer" 
                                        className="w-full h-full object-cover object-center"
                                        onError={(e) => {
                                            console.log('Image failed to load from /Photo.jpg');
                                            const parent = e.currentTarget.parentElement!;
                                            parent.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
                                            parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white text-6xl font-bold">A</div>';
                                        }}
                                        onLoad={() => console.log('Image loaded successfully from /Photo.jpg')}
                                    />
                                </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
                                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-center">
                                        <h2 className="text-white text-lg font-bold mb-1">Albin Rushiti</h2>
                                        <p className="text-white/90 text-sm">Full Stack Developer</p>
                                    </div>
                                </div>
                            </PixelCard>
                        </div>
                        
                        {/* CTA buttons below image */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <Link href="/projects">
                                <Button size="lg" className="group">
                                    View My Work
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg">
                                    Get In Touch
                                </Button>
                            </Link>
                        </div>

                        {/* Social links */}
                        <div className="flex items-center justify-center gap-4">
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                
                                if (social.external) {
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                                            aria-label={social.ariaLabel}
                                        >
                                            <IconComponent className="h-5 w-5" />
                                        </a>
                                    );
                                }
                                
                                return (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                                        aria-label={social.ariaLabel}
                                    >
                                        <IconComponent className="h-5 w-5" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="relative z-20 w-full py-6 bg-background/20 backdrop-blur-sm">
                    <LogoLoop
                        logos={techLogos}
                        speed={100}
                        logoHeight={60}
                        gap={60}
                        pauseOnHover={true}
                        fadeOut={true}
                        scaleOnHover={true}
                    />
                </div>
            </section>
        </MainLayout>
    );
}