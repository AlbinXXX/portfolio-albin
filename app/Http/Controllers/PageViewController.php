<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageViewController extends Controller
{
    public function show(string $slug)
    {
        $page = Page::where('slug', $slug)
            ->published()
            ->firstOrFail();

        return Inertia::render('PublicPage', [
            'page' => $page,
        ]);
    }

    public function preview(Page $page)
    {
        // Allow preview for any status, but require authentication
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        return Inertia::render('PublicPage', [
            'page' => $page,
            'isPreview' => true,
        ]);
    }
}
