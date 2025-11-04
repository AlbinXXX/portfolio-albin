import { Head, Link } from '@inertiajs/react';
import FaultyTerminal from '@/components/FaultyTerminal';
import Folder from '@/components/Folder';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';

interface Project {
    id: number;
    slug: string;
    title: string;
    description: string;
    technologies: string[];
    tags: string[];
    github_url?: string;
    live_url?: string;
    is_featured: boolean;
    completed_at?: string;
    featured_image_url?: string;
}

interface ProjectsProps {
    projects: Project[];
}

// Function to generate a color based on project title
const getProjectColor = (title: string): string => {
    const colors = [
        '#6366f1', '#ec4899', '#10b981', '#f59e0b', 
        '#8b5cf6', '#ef4444', '#06b6d4', '#84cc16'
    ];
    const hash = title.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
};

export default function Projects({ projects }: ProjectsProps) {
    return (
        <MainLayout>
            <Head title="Projects - Albin Rushiti" />
            
            {/* Projects Section with FaultyTerminal Background */}
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
                                My Projects
                            </h1>
                            <p className="text-lg md:text-xl text-white font-mono">
                                SELECT * FROM projects WHERE status = 'completed' ORDER BY awesomeness DESC;
                            </p>
                        </div>

                        {/* Projects Grid - Centered */}
                        <div className="flex justify-center mb-16">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-5xl justify-items-center">
                                {projects.map((project: Project) => {
                                    const projectColor = getProjectColor(project.title);
                                    return (
                                        <div key={project.id} className="flex flex-col items-center group">
                                            {/* Folder Component */}
                                            <div className="mb-4">
                                                <Folder
                                                    color={projectColor}
                                                    size={1.2}
                                                    items={[
                                                        // Position 0 (LEFT): GitHub or null
                                                        project.github_url ? (
                                                            <a
                                                                href={project.github_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="w-full h-full rounded-lg flex flex-col items-center justify-center text-white font-bold text-xs hover:scale-105 transition-transform cursor-pointer"
                                                                style={{ background: `linear-gradient(135deg, #333, #555)` }}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <Github className="h-6 w-6 mb-1" />
                                                                <span>GitHub</span>
                                                            </a>
                                                        ) : null,
                                                        
                                                        // Position 1 (CENTER): IMAGE - ONLY if featured_image_url exists
                                                        project.featured_image_url ? (
                                                            project.live_url ? (
                                                                <a
                                                                    href={project.live_url.startsWith('http') ? project.live_url : project.live_url}
                                                                    target={project.live_url.startsWith('http') ? "_blank" : "_self"}
                                                                    rel={project.live_url.startsWith('http') ? "noopener noreferrer" : undefined}
                                                                    className="w-full h-full"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <div className="w-full h-full rounded-lg overflow-hidden bg-white border border-gray-200 hover:scale-105 transition-transform cursor-pointer">
                                                                        <img 
                                                                            src={project.featured_image_url} 
                                                                            alt={project.title}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                </a>
                                                            ) : (
                                                                <div className="w-full h-full rounded-lg overflow-hidden bg-white border border-gray-200">
                                                                    <img 
                                                                        src={project.featured_image_url} 
                                                                        alt={project.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            )
                                                        ) : null, // NO PLACEHOLDER - just null if no image
                                                        
                                                        // Position 2 (RIGHT): Always null
                                                        null
                                                    ].filter(item => item !== null)} // Remove null items
                                                    className="transition-transform duration-200 group-hover:scale-105"
                                                />
                                            </div>
                                            
                                            {/* Project Info */}
                                            <div className="text-center">
                                                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                <div className="flex items-center justify-center gap-2">
                                                    {project.github_url && (
                                                        <a
                                                            href={project.github_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                                                            aria-label={`View ${project.title} on GitHub`}
                                                        >
                                                            <Github className="h-4 w-4" />
                                                        </a>
                                                    )}
                                                    {project.live_url && (
                                                        <a
                                                            href={project.live_url}
                                                            target={project.live_url.startsWith('http') ? "_blank" : "_self"}
                                                            rel={project.live_url.startsWith('http') ? "noopener noreferrer" : undefined}
                                                            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                                                            aria-label={`View ${project.title} demo`}
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Call to Action - At bottom of container */}
                        <div>
                            <div className="bg-background/20 backdrop-blur-sm rounded-lg p-8 inline-block mx-auto">
                                <h3 className="text-2xl font-bold mb-4 text-white">Interested in working together?</h3>
                                <p className="text-white/80 mb-6">
                                    Let's build something amazing together!
                                </p>
                                <Link href="/contact">
                                    <Button size="lg">
                                        Get In Touch
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}