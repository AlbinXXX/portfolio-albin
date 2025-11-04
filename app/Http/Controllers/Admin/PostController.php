<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Tags\Tag;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::with(['category', 'user'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function create(): Response
    {
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();

        $availableTags = Tag::orderBy('name')->get()->map(function ($tag) {
            return [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
            ];
        });

        return Inertia::render('Admin/Posts/Create', [
            'categories' => $categories,
            'availableTags' => $availableTags,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
            'category_id' => 'nullable|exists:categories,id',
            'published_at' => 'nullable|date',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
        ]);

        $validated['user_id'] = auth()->id();
        
        if ($validated['status'] === 'published' && !$validated['published_at']) {
            $validated['published_at'] = now();
        }

        $tags = $validated['tags'] ?? [];
        unset($validated['tags']);

        $post = Post::create($validated);

        // Attach tags
        if (!empty($tags)) {
            $post->attachTags($tags);
        }

        return redirect()->route('admin.posts.edit', $post->id)
            ->with('success', 'Post created successfully!');
    }

    public function show(int $id): Response
    {
        $post = Post::findOrFail($id);
        $post->load(['category', 'user']);

        return Inertia::render('Admin/Posts/Show', [
            'post' => $post,
        ]);
    }

    public function edit(int $id): Response
    {
        $post = Post::with('tags')->findOrFail($id);
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();

        $availableTags = Tag::orderBy('name')->get()->map(function ($tag) {
            return [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
            ];
        });

        $postTags = $post->tags->pluck('name')->toArray();

        return Inertia::render('Admin/Posts/Edit', [
            'post' => array_merge($post->toArray(), ['tags' => $postTags]),
            'categories' => $categories,
            'availableTags' => $availableTags,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $post = Post::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
            'category_id' => 'nullable|exists:categories,id',
            'published_at' => 'nullable|date',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
        ]);

        if ($validated['status'] === 'published' && !$post->published_at && !$validated['published_at']) {
            $validated['published_at'] = now();
        }

        $tags = $validated['tags'] ?? [];
        unset($validated['tags']);

        $post->update($validated);

        // Sync tags (remove old ones and add new ones)
        $post->syncTags($tags);

        return redirect()->route('admin.posts.edit', $post->id)
            ->with('success', 'Post updated successfully!');
    }

    public function destroy(int $id): RedirectResponse
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return redirect()->route('admin.posts.index')
            ->with('success', 'Post deleted successfully!');
    }
}
