<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'posts' => [
                'total' => Post::count(),
                'published' => Post::published()->count(),
                'drafts' => Post::where('status', 'draft')->count(),
            ],
            'projects' => [
                'total' => Project::count(),
                'active' => Project::active()->count(),
                'featured' => Project::featured()->count(),
            ],
        ];

        $recentPosts = Post::with(['category', 'user'])
            ->latest()
            ->take(5)
            ->get();

        $recentProjects = Project::latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentPosts' => $recentPosts,
            'recentProjects' => $recentProjects,
        ]);
    }
}
