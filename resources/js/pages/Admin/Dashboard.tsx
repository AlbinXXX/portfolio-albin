import AdminLayout from '@/layouts/AdminLayout';
import { Link } from '@inertiajs/react';

interface Stats {
    posts: {
        total: number;
        published: number;
        drafts: number;
    };
    projects: {
        total: number;
        active: number;
        featured: number;
    };
}

interface Post {
    id: number;
    title: string;
    status: string;
    created_at: string;
    category?: {
        name: string;
        color: string;
    };
}

interface Project {
    id: number;
    title: string;
    status: string;
    is_featured: boolean;
    created_at: string;
}

interface Props {
    stats: Stats;
    recentPosts: Post[];
    recentProjects: Project[];
}

export default function Dashboard({ stats, recentPosts, recentProjects }: Props) {
    return (
        <AdminLayout title="Admin Dashboard">
            <div className="px-4 sm:px-0">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Welcome to your portfolio admin panel
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">P</span>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Posts
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {stats.posts.total}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <span className="text-green-600 font-medium">
                                    {stats.posts.published} published
                                </span>
                                <span className="text-gray-500 ml-2">
                                    {stats.posts.drafts} drafts
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">Pr</span>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Projects
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {stats.projects.total}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <span className="text-green-600 font-medium">
                                    {stats.projects.active} active
                                </span>
                                <span className="text-gray-500 ml-2">
                                    {stats.projects.featured} featured
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Recent Posts */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Recent Posts</h3>
                                <Link
                                    href="/admin/posts"
                                    className="text-sm text-blue-600 hover:text-blue-500"
                                >
                                    View all
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {recentPosts.length > 0 ? (
                                    recentPosts.map((post) => (
                                        <div key={post.id} className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/admin/posts/${post.id}/edit`}
                                                    className="text-sm font-medium text-gray-900 hover:text-blue-600 truncate"
                                                >
                                                    {post.title}
                                                </Link>
                                                <div className="flex items-center mt-1 space-x-2">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            post.status === 'published'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                    >
                                                        {post.status}
                                                    </span>
                                                    {post.category && (
                                                        <span
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                                                            style={{ backgroundColor: post.category.color }}
                                                        >
                                                            {post.category.name}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No posts yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Projects */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Recent Projects</h3>
                                <Link
                                    href="/admin/projects"
                                    className="text-sm text-blue-600 hover:text-blue-500"
                                >
                                    View all
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {recentProjects.length > 0 ? (
                                    recentProjects.map((project) => (
                                        <div key={project.id} className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/admin/projects/${project.id}/edit`}
                                                    className="text-sm font-medium text-gray-900 hover:text-blue-600 truncate"
                                                >
                                                    {project.title}
                                                </Link>
                                                <div className="flex items-center mt-1 space-x-2">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            project.status === 'active'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {project.status}
                                                    </span>
                                                    {project.is_featured && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No projects yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <Link
                                    href="/admin/posts/create"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    New Post
                                </Link>
                                <Link
                                    href="/admin/projects/create"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    New Project
                                </Link>
                                <Link
                                    href="/admin/posts"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Manage Posts
                                </Link>
                                <Link
                                    href="/admin/projects"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Manage Projects
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}