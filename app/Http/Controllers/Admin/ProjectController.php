<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Tags\Tag;

class ProjectController extends Controller
{
    public function index(): Response
    {
        // Get projects without tags first
        $projects = Project::latest()->paginate(10);
        
        // Transform to include empty tags array for now
        $projects->getCollection()->transform(function ($project) {
            $project->tags = [];
            return $project;
        });

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        $availableTags = Tag::orderBy('name')->get()->map(function ($tag) {
            return [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
            ];
        });

        return Inertia::render('Admin/Projects/Create', [
            'availableTags' => $availableTags,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'sort_order' => 'nullable|integer|min:0',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:50',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|string',
            'is_featured' => 'nullable|in:0,1,true,false',
            'completed_at' => 'nullable|date',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'featured_image' => 'nullable|image|max:5120', // 5MB max
        ]);

        // Convert is_featured to boolean since FormData sends it as string
        $validated['is_featured'] = in_array($validated['is_featured'] ?? false, ['1', 'true', true], true);

        $tags = $validated['tags'] ?? [];
        unset($validated['tags']);
        
        $featuredImage = $request->file('featured_image');
        unset($validated['featured_image']);

        $project = Project::create($validated);

        // Handle featured image upload
        if ($featuredImage) {
            $project->addMediaFromRequest('featured_image')
                ->toMediaCollection('featured_image');
        }

        // Attach tags
        if (!empty($tags)) {
            $project->attachTags($tags);
        }

        return redirect()->route('admin.projects.edit', $project->id)
            ->with('success', 'Project created successfully!');
    }

    public function show(int $id): Response
    {
        $project = Project::with('tags')->findOrFail($id);

        return Inertia::render('Admin/Projects/Show', [
            'project' => $project,
        ]);
    }

    public function edit(int $id): Response
    {
        $project = Project::with('tags')->findOrFail($id);
        
        $availableTags = Tag::orderBy('name')->get()->map(function ($tag) {
            return [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
            ];
        });

        $projectTags = $project->tags->pluck('name')->toArray();
        
        // Get featured image URL
        $featuredImageUrl = $project->getFirstMediaUrl('featured_image');

        return Inertia::render('Admin/Projects/Edit', [
            'project' => array_merge($project->toArray(), [
                'tags' => $projectTags,
                'featured_image_url' => $featuredImageUrl ?: null,
            ]),
            'availableTags' => $availableTags,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $project = Project::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'sort_order' => 'nullable|integer|min:0',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:50',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'completed_at' => 'nullable|date',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'featured_image' => 'nullable|image|max:5120', // 5MB max
        ]);

        // Convert is_featured to boolean since FormData sends it as string
        $validated['is_featured'] = filter_var($validated['is_featured'] ?? false, FILTER_VALIDATE_BOOLEAN);

        $tags = $validated['tags'] ?? [];
        unset($validated['tags']);
        
        $featuredImage = $request->file('featured_image');
        unset($validated['featured_image']);

        $project->update($validated);

        // Handle featured image upload
        if ($featuredImage) {
            // Clear existing featured image
            $project->clearMediaCollection('featured_image');
            
            // Add new featured image
            $project->addMediaFromRequest('featured_image')
                ->toMediaCollection('featured_image');
        }

        // Sync tags (remove old ones and add new ones)
        $project->syncTags($tags);

        return redirect()->route('admin.projects.edit', $project->id)
            ->with('success', 'Project updated successfully!');
    }

    public function destroy(int $id): RedirectResponse
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project deleted successfully!');
    }
}
