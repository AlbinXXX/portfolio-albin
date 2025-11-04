<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $posts = Post::with(['category', 'user'])
            ->published()
            ->recent()
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => $post->excerpt ?? 'No excerpt available',
                    'publishedAt' => $post->published_at->format('Y-m-d'),
                    'readTime' => $this->calculateReadTime($post->content),
                    'tags' => $post->tags->pluck('name')->toArray(),
                    'author' => $post->user ? $post->user->name : 'Unknown Author',
                    'category' => $post->category?->name,
                ];
            });

        return Inertia::render('BlogIndex', [
            'posts' => $posts
        ]);
    }

    public function show(Post $post): Response
    {
        // Ensure the post is published
        if ($post->status !== 'published' || !$post->published_at || $post->published_at->isFuture()) {
            abort(404);
        }

        $postData = [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'content' => $post->content,
            'publishedAt' => $post->published_at->format('Y-m-d'),
            'readTime' => $this->calculateReadTime($post->content),
            'tags' => $post->tags->pluck('name')->toArray(),
            'author' => $post->user->name,
            'category' => $post->category?->name,
            'featuredImage' => $post->featured_image,
        ];

        return Inertia::render('BlogPost', [
            'post' => $postData
        ]);
    }

    private function calculateReadTime(string $content): string
    {
        $wordCount = str_word_count(strip_tags($content));
        $minutes = max(1, ceil($wordCount / 200)); // Average reading speed: 200 words per minute
        
        return $minutes . ' min read';
    }
}