import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';

export default function ProjectsIndex() {
    // Mock projects data - we'll replace this with real data later
    const projects = [
        {
            id: 1,
            title: "A/B Testing Analytics Dashboard",
            description: "A comprehensive A/B testing platform with real-time analytics, conversion tracking, and variant management. Built with React, Laravel, and modern TypeScript.",
            image: "/api/placeholder/600/400",
            technologies: ["React", "Laravel", "TypeScript", "PostgreSQL", "Redis", "Tailwind CSS"],
            features: [
                "Real-time experiment tracking",
                "Conversion rate analytics",
                "Statistical significance testing",
                "Variant management system"
            ],
            demoUrl: "/ab-test-analytics",
            githubUrl: "#",
            status: "Live"
        },
        {
            id: 2,
            title: "Portfolio Blog System",
            description: "Modern blog platform with rich text editing, dynamic page builder, and content management. Features advanced markdown support and media management.",
            image: "/api/placeholder/600/400",
            technologies: ["Laravel", "React", "Inertia.js", "TipTap", "Spatie Media Library"],
            features: [
                "Rich text WYSIWYG editor",
                "Dynamic page builder",
                "Media management system",
                "SEO optimization"
            ],
            demoUrl: "/blog",
            githubUrl: "#",
            status: "Live"
        },
        {
            id: 3,
            title: "WebGL Terminal Effects",
            description: "Stunning terminal-style visual effects using WebGL shaders and OGL. Features mouse interaction, glitch effects, and smooth animations.",
            image: "/api/placeholder/600/400",
            technologies: ["TypeScript", "WebGL", "OGL", "React", "Shader Programming"],
            features: [
                "Real-time WebGL rendering",
                "Interactive mouse effects",
                "Customizable shader parameters",
                "Mobile-responsive design"
            ],
            demoUrl: "/",
            githubUrl: "#",
            status: "Live"
        },
        {
            id: 4,
            title: "Contact Management System",
            description: "Full-featured contact system with file uploads, email notifications, and admin management. Built with modern form validation and UX patterns.",
            image: "/api/placeholder/600/400",
            technologies: ["Laravel", "React Hook Form", "Zod", "Mail System", "File Uploads"],
            features: [
                "Advanced form validation",
                "File attachment support",
                "Email notifications",
                "Admin management panel"
            ],
            demoUrl: "/contact",
            githubUrl: "#",
            status: "Live"
        }
    ];

    return (
        <MainLayout>
            <Head title="Projects - Albin Rushiti" />

            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Projects</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A collection of web applications and tools I've built using modern technologies and best practices.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project) => (
                        <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Project Image */}
                            <div className="aspect-video bg-muted relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
                                    <h3 className="text-2xl font-bold text-center px-4">
                                        {project.title}
                                    </h3>
                                </div>
                            </div>
                            
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <CardTitle className="text-xl">
                                        {project.title}
                                    </CardTitle>
                                    <Badge variant={project.status === 'Live' ? 'default' : 'secondary'}>
                                        {project.status}
                                    </Badge>
                                </div>
                                
                                <CardDescription className="text-base">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="space-y-4">
                                {/* Technologies */}
                                <div>
                                    <h4 className="font-medium mb-2">Technologies</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Features */}
                                <div>
                                    <h4 className="font-medium mb-2">Key Features</h4>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        {project.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-2">
                                    <Link href={project.demoUrl}>
                                        <Button size="sm" className="flex-1">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Live Demo
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Github className="w-4 h-4 mr-2" />
                                        Source
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
                    <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                        I'm always open to discussing new opportunities and interesting projects.
                    </p>
                    <Link href="/contact">
                        <Button size="lg">
                            Get In Touch
                        </Button>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}