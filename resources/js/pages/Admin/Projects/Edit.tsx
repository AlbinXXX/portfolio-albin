import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import TipTapEditor from '@/components/TipTapEditor';
import TagsInput from '@/components/TagsInput';
import ImageUpload from '@/components/ImageUpload';
import { Head, Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

interface TagOption {
    id: number;
    name: string;
    slug: string;
}

interface Project {
    id: number;
    title: string;
    slug: string;
    description?: string;
    content?: string;
    status: 'active' | 'inactive';
    technologies: string[];
    github_url?: string;
    live_url?: string;
    is_featured: boolean;
    completed_at?: string;
    created_at: string;
    updated_at: string;
    tags: string[];
    featured_image_url?: string;
}

interface Props {
    project: Project;
    availableTags: TagOption[];
}

const projectInputSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
    description: z.string().max(500, 'Description too long').optional(),
    content: z.string().optional(),
    status: z.enum(['active', 'inactive']),
    technologies: z.array(z.string()).optional(),
    github_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    live_url: z.string().optional(),
    is_featured: z.boolean(),
    completed_at: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

const projectOutputSchema = projectInputSchema.transform((data) => ({
    ...data,
    github_url: data.github_url === '' ? undefined : data.github_url,
}));

type ProjectFormData = z.infer<typeof projectInputSchema>;

export default function Edit({ project, availableTags }: Props) {
    // State for TagsInput components
    const [technologies, setTechnologies] = useState<string[]>(project.technologies || []);
    const [tags, setTags] = useState<string[]>(project.tags || []);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectInputSchema),
        defaultValues: {
            title: project.title,
            description: project.description || '',
            content: project.content || '',
            status: project.status,
            technologies: project.technologies || [],
            github_url: project.github_url || '',
            live_url: project.live_url || '',
            is_featured: project.is_featured,
            completed_at: project.completed_at ? new Date(project.completed_at).toISOString().slice(0, 16) : '',
            tags: project.tags || [],
        },
    });

    const watchContent = watch('content');

    const onSubmit = (data: ProjectFormData) => {
        const formData = new FormData();
        
        // Add form fields with proper type handling
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (key === 'is_featured') {
                    // Convert boolean to 1/0 for Laravel
                    formData.append(key, value ? '1' : '0');
                } else {
                    formData.append(key, String(value));
                }
            }
        });
        
        // Add arrays
        technologies.forEach(tech => formData.append('technologies[]', tech));
        tags.forEach(tag => formData.append('tags[]', tag));
        
        // Add featured image if selected
        if (featuredImage) {
            formData.append('featured_image', featuredImage);
        }
        
        // Laravel requires _method for PUT requests with FormData
        formData.append('_method', 'PUT');
        
        router.post(`/admin/projects/${project.id}`, formData, {
            onSuccess: () => {
                toast.success('Project updated successfully!');
            },
            onError: (errors) => {
                toast.error('Failed to update project');
                console.error(errors);
            },
        });
    };

    const deleteProject = () => {
        if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            router.delete(`/admin/projects/${project.id}`, {
                onSuccess: () => {
                    toast.success('Project deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete project');
                },
            });
        }
    };

    return (
        <AdminLayout title={`Edit: ${project.title}`}>
            <Head title={`Edit: ${project.title}`} />
            
            <div className="px-4 sm:px-0">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Project</h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Update your project details and content
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={deleteProject}
                                className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-600 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                Delete Project
                            </button>
                            <Link
                                href="/admin/projects"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                ← Back to Projects
                            </Link>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    {...register('title')}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="Enter project title..."
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    {...register('description')}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="Brief description of the project..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                                )}
                            </div>

                            {/* URLs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="github_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        GitHub URL
                                    </label>
                                    <input
                                        type="url"
                                        id="github_url"
                                        {...register('github_url')}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                        placeholder="https://github.com/username/repo"
                                    />
                                    {errors.github_url && (
                                        <p className="mt-1 text-sm text-red-600">{errors.github_url.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="live_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Live URL
                                    </label>
                                    <input
                                        type="text"
                                        id="live_url"
                                        {...register('live_url')}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                        placeholder="https://example.com or /demo"
                                    />
                                    {errors.live_url && (
                                        <p className="mt-1 text-sm text-red-600">{errors.live_url.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Content Editor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Content
                                </label>
                                <TipTapEditor
                                    content={watchContent || ''}
                                    onChange={(content) => setValue('content', content)}
                                    placeholder="Detailed project description..."
                                />
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Featured Image */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Featured Image</h3>
                                <ImageUpload
                                    value={project.featured_image_url || null}
                                    onChange={setFeaturedImage}
                                    placeholder="Upload a new featured image"
                                    maxSize={5}
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    {project.featured_image_url 
                                        ? "Upload a new image to replace the current one" 
                                        : "This image will be displayed in the project folder and listings"
                                    }
                                </p>
                            </div>

                            {/* Status & Settings */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Status & Settings</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            {...register('status')}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_featured"
                                            {...register('is_featured')}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            Featured project
                                        </label>
                                    </div>

                                    <div>
                                        <label htmlFor="completed_at" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Completed Date
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="completed_at"
                                            {...register('completed_at')}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Updating...' : 'Update Project'}
                                    </button>
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Technologies</h3>
                                
                                <div>
                                    <TagsInput
                                        value={watch('technologies') || []}
                                        onChange={(technologies) => setValue('technologies', technologies)}
                                        availableTags={[]}
                                        placeholder="Add technologies used..."
                                    />
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        Press Enter to add a technology
                                    </p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Tags</h3>
                                
                                <div>
                                    <TagsInput
                                        value={watch('tags') || []}
                                        onChange={(tags) => setValue('tags', tags)}
                                        availableTags={availableTags}
                                        placeholder="Add tags to categorize your project..."
                                    />
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        Press Enter to add a tag, or select from existing tags
                                    </p>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Project Info</h3>
                                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <div>
                                        <strong>Slug:</strong> {project.slug}
                                    </div>
                                    <div>
                                        <strong>Created:</strong> {new Date(project.created_at).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <strong>Updated:</strong> {new Date(project.updated_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}