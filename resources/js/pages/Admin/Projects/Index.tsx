import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    ExternalLink, 
    Github, 
    Edit, 
    Trash2, 
    Plus,
    Star
} from 'lucide-react';

interface Project {
    id: number;
    title: string;
    slug: string;
    description?: string;
    status: 'active' | 'inactive';
    technologies: string[];
    github_url?: string;
    live_url?: string;
    is_featured: boolean;
    completed_at?: string;
    created_at: string;
    updated_at: string;
    tags: any[];
}

interface Props {
    projects: {
        data: Project[];
        links: any[];
        meta: any;
    };
}

export default function Index({ projects }: Props) {
    return (
        <AdminLayout title="Projects">
            <Head title="Projects" />
            
            <div className="px-4 sm:px-0">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Manage your portfolio projects
                            </p>
                        </div>
                        <Link
                            href="/admin/projects/create"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            New Project
                        </Link>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        {projects.data.length > 0 ? (
                            <div className="space-y-6">
                                {projects.data.map((project) => (
                                    <div
                                        key={project.id}
                                        className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                        {project.title}
                                                    </h3>
                                                    {project.is_featured && (
                                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                    )}
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            project.status === 'active'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                        }`}
                                                    >
                                                        {project.status}
                                                    </span>
                                                </div>
                                                
                                                {project.description && (
                                                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                        {project.description}
                                                    </p>
                                                )}

                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {project.technologies.map((tech, index) => (
                                                        <Badge
                                                            key={`tech-${project.id}-${index}`}
                                                            variant="secondary"
                                                            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                {project.tags && project.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {project.tags.map((tag, index) => {
                                                            // Handle different tag structures from Spatie Tags
                                                            const tagName = typeof tag === 'string' 
                                                                ? tag 
                                                                : tag.name || tag.en || String(tag);
                                                            
                                                            return (
                                                                <Badge
                                                                    key={`tag-${project.id}-${index}`}
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {tagName}
                                                                </Badge>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <span>
                                                        Created: {new Date(project.created_at).toLocaleDateString()}
                                                    </span>
                                                    {project.completed_at && (
                                                        <span>
                                                            Completed: {new Date(project.completed_at).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 ml-4">
                                                {project.github_url && (
                                                    <a
                                                        href={project.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                        title="View on GitHub"
                                                    >
                                                        <Github className="h-4 w-4" />
                                                    </a>
                                                )}
                                                {project.live_url && (
                                                    <a
                                                        href={project.live_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                        title="View live project"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                )}
                                                
                                                <Link
                                                    href={`/admin/projects/${project.id}/edit`}
                                                    className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                    title="Edit project"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <Plus className="h-12 w-12 mx-auto" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    No projects yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Get started by creating your first project.
                                </p>
                                <Link
                                    href="/admin/projects/create"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Project
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}