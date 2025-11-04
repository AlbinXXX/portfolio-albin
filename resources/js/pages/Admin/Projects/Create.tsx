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

interface Props {
    availableTags: TagOption[];
}

const projectInputSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    content: z.string().optional(),
    status: z.enum(['active', 'inactive']),
    sort_order: z.number().min(0).optional(),
    technologies: z.array(z.string()).optional(),
    github_url: z.string().optional(),
    live_url: z.string().optional(),
    completed_at: z.string().optional(),
    is_featured: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
});

const projectOutputSchema = projectInputSchema.transform((data) => ({
    ...data,
    github_url: data.github_url === '' ? undefined : data.github_url,
}));

type ProjectFormData = z.infer<typeof projectInputSchema>;

export default function Create({ availableTags }: Props) {
    // State for TagsInput components
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
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
            title: '',
            description: '',
            content: '',
            status: 'active',
            sort_order: 0,
            technologies: [],
            github_url: '',
            live_url: '',
            completed_at: '',
            is_featured: false,
            tags: [],
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

        router.post('/admin/projects', formData, {
            onSuccess: () => {
                toast.success('Project created successfully!');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                Object.values(errors).forEach((error) => {
                    if (typeof error === 'string') {
                        toast.error(error);
                    }
                });
            },
        });
    };    return (
        <AdminLayout title="Create Project">
            <Head title="Create Project" />
            
            <div className="px-4 sm:px-0">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create New Project</h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Add a new project to your portfolio
                            </p>
                        </div>
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            ← Back to Projects
                        </Link>
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
                                    value={null}
                                    onChange={setFeaturedImage}
                                    placeholder="Upload a featured image for the project"
                                    maxSize={5}
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    This image will be displayed in the project folder and listings
                                </p>
                            </div>

                            {/* Publish Status */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Project Settings</h3>
                                
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

                                    <div>
                                        <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Display Order
                                        </label>
                                        <input
                                            type="number"
                                            id="sort_order"
                                            min="0"
                                            {...register('sort_order', { valueAsNumber: true })}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                            placeholder="0"
                                        />
                                        {errors.sort_order && (
                                            <p className="mt-1 text-sm text-red-600">{errors.sort_order.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Technologies
                                        </label>
                                        <TagsInput
                                            value={technologies}
                                            onChange={setTechnologies}
                                            placeholder="Add technologies..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tags
                                        </label>
                                        <TagsInput
                                            value={tags}
                                            onChange={setTags}
                                            availableTags={availableTags}
                                            placeholder="Add or select tags..."
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="is_featured"
                                            type="checkbox"
                                            {...register('is_featured')}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                                            Featured Project
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-6 flex space-x-3">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Project'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}