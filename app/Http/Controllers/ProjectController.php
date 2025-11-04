<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::active()
            ->with('tags')
            ->ordered()
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'slug' => $project->slug,
                    'title' => $project->title,
                    'description' => $project->description,
                    'technologies' => $project->technologies ?? [],
                    'tags' => $project->tags->pluck('name')->toArray(),
                    'github_url' => $project->github_url,
                    'live_url' => $project->live_url,
                    'is_featured' => $project->is_featured,
                    'completed_at' => $project->completed_at?->format('Y-m-d'),
                    'featured_image_url' => $project->getFirstMediaUrl('featured_image') ?: null,
                ];
            });

        return Inertia::render('Projects', [
            'projects' => $projects
        ]);
    }

    public function show(Project $project): Response
    {
        // Ensure the project is active
        if ($project->status !== 'active') {
            abort(404);
        }

        $project->load('tags');

        $projectData = [
            'id' => $project->id,
            'slug' => $project->slug,
            'title' => $project->title,
            'description' => $project->description,
            'content' => $project->content,
            'technologies' => $project->technologies ?? [],
            'tags' => $project->tags->pluck('name')->toArray(),
            'github_url' => $project->github_url,
            'live_url' => $project->live_url,
            'is_featured' => $project->is_featured,
            'completed_at' => $project->completed_at?->format('Y-m-d'),
            'featured_image_url' => $project->getFirstMediaUrl('featured_image') ?: null,
            'gallery_image_urls' => $project->getMedia('gallery')->map(function($media) {
                return $media->getUrl();
            })->toArray(),
        ];

        return Inertia::render('ProjectDetail', [
            'project' => $projectData
        ]);
    }
}