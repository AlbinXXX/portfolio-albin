import AdminLayout from '@/layouts/AdminLayout';
import TipTapEditor from '@/components/TipTapEditor';
import TagsInput from '@/components/TagsInput';
import { Head, Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface TagOption {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    categories: Category[];
    availableTags: TagOption[];
}

const postInputSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
    excerpt: z.string().max(500, 'Excerpt too long').optional(),
    content: z.string().min(1, 'Content is required'),
    status: z.enum(['draft', 'published']),
    category_id: z.string().optional(),
    published_at: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

const postOutputSchema = postInputSchema.transform((data) => ({
    ...data,
    category_id: data.category_id && data.category_id !== '' ? parseInt(data.category_id, 10) : undefined,
}));

type PostFormData = z.infer<typeof postInputSchema>;

export default function Create({ categories, availableTags }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<PostFormData>({
        resolver: zodResolver(postInputSchema),
        defaultValues: {
            status: 'draft',
            content: '',
            tags: [],
        },
    });

    const watchContent = watch('content');
    const watchStatus = watch('status');

    const onSubmit = (data: PostFormData) => {
        const transformedData = postOutputSchema.parse(data);
        
        router.post('/admin/posts', transformedData, {
            onSuccess: () => {
                toast.success('Post created successfully!');
            },
            onError: (errors) => {
                toast.error('Failed to create post');
                console.error(errors);
            },
        });
    };

    return (
        <AdminLayout title="Create Post">
            <Head title="Create Post" />
            
            <div className="px-4 sm:px-0">
                    <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create New Post</h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Write and publish a new blog post
                            </p>
                        </div>
                        <Link
                            href="/admin/posts"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            ← Back to Posts
                        </Link>
                    </div>
                </div>                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                                    placeholder="Enter post title..."
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Excerpt
                                </label>
                                <textarea
                                    id="excerpt"
                                    rows={3}
                                    {...register('excerpt')}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="Brief description of the post..."
                                />
                                {errors.excerpt && (
                                    <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
                                )}
                            </div>

                            {/* Content Editor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Content *
                                </label>
                                <TipTapEditor
                                    content={watchContent}
                                    onChange={(content) => setValue('content', content)}
                                    placeholder="Start writing your post..."
                                />
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Publish Status */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Publish</h3>
                                
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
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>

                                    {watchStatus === 'published' && (
                                        <div>
                                            <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Publish Date
                                            </label>
                                            <input
                                                type="datetime-local"
                                                id="published_at"
                                                {...register('published_at')}
                                                className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex space-x-3">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Post'}
                                    </button>
                                </div>
                            </div>

                            {/* Category */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Category</h3>
                                
                                <div>
                                    <select
                                        {...register('category_id')}
                                        className="block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
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
                                        placeholder="Add tags to help categorize your post..."
                                    />
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        Press Enter to add a tag, or select from existing tags
                                    </p>
                                </div>
                            </div>

                            {/* SEO Preview */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">SEO Preview</h3>
                                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                    <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">yoursite.com/blog/post-slug</div>
                                    <div className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-1">
                                        {watch('title') || 'Post Title'}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {watch('excerpt') || 'Post excerpt will appear here...'}
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