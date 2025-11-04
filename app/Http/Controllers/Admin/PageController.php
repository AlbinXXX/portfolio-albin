<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::with(['creator', 'updater'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pages/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:pages,slug',
            'meta_description' => 'nullable|string|max:160',
            'content' => 'required|array',
            'settings' => 'nullable|array',
            'seo_data' => 'nullable|array',
            'status' => 'required|in:draft,published,archived',
        ]);

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $page = Page::create($validated);

        return redirect()->route('admin.pages.edit', $page)
            ->with('success', 'Page created successfully.');
    }

    public function show(Page $page)
    {
        return Inertia::render('Admin/Pages/Show', [
            'page' => $page->load(['creator', 'updater']),
        ]);
    }

    public function edit(Page $page)
    {
        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page,
        ]);
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('pages')->ignore($page->id)],
            'meta_description' => 'nullable|string|max:160',
            'content' => 'required|array',
            'settings' => 'nullable|array',
            'seo_data' => 'nullable|array',
            'status' => 'required|in:draft,published,archived',
        ]);

        $validated['updated_by'] = auth()->id();

        // Handle publishing
        if ($validated['status'] === 'published' && $page->status !== 'published') {
            $validated['published_at'] = now();
        } elseif ($validated['status'] !== 'published') {
            $validated['published_at'] = null;
        }

        $page->update($validated);

        return redirect()->back()
            ->with('success', 'Page updated successfully.');
    }

    public function destroy(Page $page)
    {
        $page->delete();

        return redirect()->route('admin.pages.index')
            ->with('success', 'Page deleted successfully.');
    }

    // API endpoints for the page builder
    public function apiSave(Request $request)
    {
        $validated = $request->validate([
            'id' => 'nullable|exists:pages,id',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:160',
            'content' => 'required|string',
            'settings' => 'nullable|string',
            'seo_data' => 'nullable|string',
            'status' => 'required|in:draft,published,archived',
        ]);

        // Decode JSON strings
        $validated['content'] = json_decode($validated['content'], true);
        $validated['settings'] = $validated['settings'] ? json_decode($validated['settings'], true) : [];
        $validated['seo_data'] = $validated['seo_data'] ? json_decode($validated['seo_data'], true) : [];

        if (isset($validated['id']) && $validated['id']) {
            // Update existing page
            $page = Page::findOrFail($validated['id']);
            
            $validated['updated_by'] = auth()->id();
            
            if ($validated['status'] === 'published' && $page->status !== 'published') {
                $validated['published_at'] = now();
            } elseif ($validated['status'] !== 'published') {
                $validated['published_at'] = null;
            }
            
            $page->update($validated);
            
            return redirect()->back()->with('success', 'Page updated successfully.');
        } else {
            // Create new page
            $validated['created_by'] = auth()->id();
            $validated['updated_by'] = auth()->id();
            
            if ($validated['status'] === 'published') {
                $validated['published_at'] = now();
            }
            
            $page = Page::create($validated);
            
            return redirect()->route('admin.pages.edit', $page)->with('success', 'Page created successfully.');
        }
    }

    public function apiLoad(Page $page)
    {
        return response()->json([
            'success' => true,
            'page' => $page,
        ]);
    }

    public function duplicate(Page $page)
    {
        $newPage = $page->replicate();
        $newPage->title = $page->title . ' (Copy)';
        $newPage->slug = null; // Will be auto-generated
        $newPage->status = 'draft';
        $newPage->published_at = null;
        $newPage->created_by = auth()->id();
        $newPage->updated_by = auth()->id();
        $newPage->save();

        return redirect()->route('admin.pages.edit', $newPage)
            ->with('success', 'Page duplicated successfully.');
    }
}
