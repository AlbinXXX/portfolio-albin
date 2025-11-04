import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { User } from '@/types';
import ThemeSwitcher from '@/components/ThemeSwitcher';

interface Props {
    children: ReactNode;
    title?: string;
}

interface PageProps extends Record<string, unknown> {
    auth: {
        user: User;
    };
}

export default function AdminLayout({ children, title = 'Admin' }: Props) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation */}
                <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/admin" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        Portfolio Admin
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    <Link
                                        href="/admin"
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/admin/posts"
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        Posts
                                    </Link>
                                    <Link
                                        href="/admin/projects"
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        Projects
                                    </Link>
                                    <Link
                                        href="/admin/pages"
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        Pages
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                                <ThemeSwitcher />
                                <div className="relative ml-3">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            {auth.user.name}
                                        </span>
                                        <Link
                                            href="/dashboard"
                                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                                        >
                                            View Site
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main content */}
                <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </>
    );
}