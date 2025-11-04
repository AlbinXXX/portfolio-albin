import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    status: 'draft' | 'published';
    published_at?: string;
    created_at: string;
    updated_at: string;
    category?: Category;
    user: User;
}

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface PaginatedPosts {
    data: Post[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    posts: PaginatedPosts;
}

export default function Index({ posts }: Props) {
    const deletePost = (post: Post) => {
        if (confirm(`Are you sure you want to delete "${post.title}"? This action cannot be undone.`)) {
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

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published':
                return <Badge variant="default" className="bg-green-100 text-green-800">Published</Badge>;
            case 'draft':
                return <Badge variant="secondary">Draft</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <AdminLayout title="Posts">
            <Head title="Posts" />
            
            <div className="px-4 sm:px-0">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Posts</h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Manage your blog posts and articles
                            </p>
                        </div>
                        <Link href="/admin/posts/create">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                New Post
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Posts Table */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Published
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {posts.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="text-gray-500 dark:text-gray-400">
                                                <p className="text-lg font-medium">No posts found</p>
                                                <p className="mt-1">Get started by creating your first post.</p>
                                                <Link href="/admin/posts/create" className="mt-4 inline-block">
                                                    <Button>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Create Post
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    posts.data.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {post.title}
                                                    </div>
                                                    {post.excerpt && (
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate max-w-md">
                                                            {post.excerpt}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {post.category ? (
                                                    <Badge variant="outline">
                                                        {post.category.name}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-gray-400 dark:text-gray-500">No category</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(post.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {post.user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    {post.status === 'published' && (
                                                        <a
                                                            href={`/blog/${post.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                            title="View post"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </a>
                                                    )}
                                                    <Link
                                                        href={`/admin/posts/${post.id}/edit`}
                                                        className="text-blue-400 hover:text-blue-600"
                                                        title="Edit post"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => deletePost(post)}
                                                        className="text-red-400 hover:text-red-600"
                                                        title="Delete post"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {posts.last_page > 1 && (
                        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing {((posts.current_page - 1) * posts.per_page) + 1} to{' '}
                                    {Math.min(posts.current_page * posts.per_page, posts.total)} of{' '}
                                    {posts.total} results
                                </div>
                                <div className="flex items-center space-x-1">
                                    {posts.links.map((link, index) => (
                                        <span key={index}>
                                            {link.url ? (
                                                <Link
                                                    href={link.url}
                                                    className={`px-3 py-1 text-sm rounded ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    className="px-3 py-1 text-sm text-gray-400 dark:text-gray-500"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}