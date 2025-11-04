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

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    status: 'draft' | 'published';
    category_id?: number;
    published_at?: string;
    created_at: string;
    updated_at: string;
    tags: string[];
}

interface Props {
    post: Post;
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

export default function Edit({ post, categories, availableTags }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<PostFormData>({
        resolver: zodResolver(postInputSchema),
        defaultValues: {
            title: post.title,
            excerpt: post.excerpt || '',
            content: post.content,
            status: post.status,
            category_id: post.category_id?.toString() || '',
            published_at: post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : '',
            tags: post.tags || [],
        },
    });

    const watchContent = watch('content');
    const watchStatus = watch('status');

    const onSubmit = (data: PostFormData) => {
        const transformedData = postOutputSchema.parse(data);
        
        router.put(`/admin/posts/${post.id}`, transformedData, {
            onSuccess: () => {
                toast.success('Post updated successfully!');
            },
            onError: (errors) => {
                toast.error('Failed to update post');
                console.error(errors);
            },
        });
    };

    const deletePost = () => {
        if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            router.delete(`/admin/posts/${post.id}`, {
                onSuccess: () => {
                    toast.success('Post deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete post');
                },
            });
        }
    };

    return (
        <AdminLayout title={`Edit: ${post.title}`}>
            <Head title={`Edit: ${post.title}`} />
            
            <div className="px-4 sm:px-0">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Post</h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Update your blog post content and settings
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={deletePost}
                                className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-600 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                Delete Post
                            </button>
                            <Link
                                href="/admin/posts"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                ← Back to Posts
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
                                        {isSubmitting ? 'Updating...' : 'Update Post'}
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

                            {/* Post Info */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Post Info</h3>
                                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <div>
                                        <strong>Slug:</strong> {post.slug}
                                    </div>
                                    <div>
                                        <strong>Created:</strong> {new Date(post.created_at).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <strong>Updated:</strong> {new Date(post.updated_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* SEO Preview */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">SEO Preview</h3>
                                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                    <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">yoursite.com/blog/{post.slug}</div>
                                    <div className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-1">
                                        {watch('title') || post.title}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {watch('excerpt') || post.excerpt || 'Post excerpt will appear here...'}
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