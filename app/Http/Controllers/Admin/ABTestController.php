<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ABTest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class ABTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $tests = ABTest::latest()->get()->map(function ($test) {
            $metrics = $test->getMetrics();
            $totalViews = $metrics->sum('views');
            $totalConversions = $metrics->sum('conversions');
            
            return [
                'id' => $test->id,
                'name' => $test->name,
                'description' => $test->description,
                'active' => $test->active,
                'isRunning' => $test->isRunning(),
                'startDate' => $test->start_date,
                'endDate' => $test->end_date,
                'variantCount' => count($test->variants),
                'totalViews' => $totalViews,
                'totalConversions' => $totalConversions,
                'overallConversionRate' => $totalViews > 0 ? round(($totalConversions / $totalViews) * 100, 2) : 0,
                'createdAt' => $test->created_at,
            ];
        });

        return Inertia::render('Admin/ABTests/Index', [
            'tests' => $tests,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/ABTests/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:a_b_tests',
            'description' => 'nullable|string|max:1000',
            'variants' => 'required|array|min:2',
            'variants.*.id' => 'required|string|distinct',
            'variants.*.name' => 'required|string|max:255',
            'variants.*.weight' => 'required|integer|min:1|max:100',
            'active' => 'boolean',
            'start_date' => 'nullable|date|after_or_equal:today',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        // Validate that weights sum to 100
        $totalWeight = array_sum(array_column($request->variants, 'weight'));
        if ($totalWeight !== 100) {
            $validator->after(function ($validator) {
                $validator->errors()->add('variants', 'Variant weights must sum to 100%');
            });
        }

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        ABTest::create($request->all());

        return redirect()
            ->route('admin.ab-tests.index')
            ->with('success', 'A/B test created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ABTest $abTest): Response
    {
        $metrics = $abTest->getMetrics();
        
        return Inertia::render('Admin/ABTests/Show', [
            'test' => [
                'id' => $abTest->id,
                'name' => $abTest->name,
                'description' => $abTest->description,
                'variants' => $abTest->variants,
                'active' => $abTest->active,
                'isRunning' => $abTest->isRunning(),
                'startDate' => $abTest->start_date,
                'endDate' => $abTest->end_date,
                'createdAt' => $abTest->created_at,
                'updatedAt' => $abTest->updated_at,
            ],
            'metrics' => $metrics,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ABTest $abTest): Response
    {
        return Inertia::render('Admin/ABTests/Edit', [
            'test' => [
                'id' => $abTest->id,
                'name' => $abTest->name,
                'description' => $abTest->description,
                'variants' => $abTest->variants,
                'active' => $abTest->active,
                'startDate' => $abTest->start_date?->format('Y-m-d'),
                'endDate' => $abTest->end_date?->format('Y-m-d'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ABTest $abTest)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:a_b_tests,name,' . $abTest->id,
            'description' => 'nullable|string|max:1000',
            'variants' => 'required|array|min:2',
            'variants.*.id' => 'required|string|distinct',
            'variants.*.name' => 'required|string|max:255',
            'variants.*.weight' => 'required|integer|min:1|max:100',
            'active' => 'boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        // Validate that weights sum to 100
        $totalWeight = array_sum(array_column($request->variants, 'weight'));
        if ($totalWeight !== 100) {
            $validator->after(function ($validator) {
                $validator->errors()->add('variants', 'Variant weights must sum to 100%');
            });
        }

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $abTest->update($request->all());

        return redirect()
            ->route('admin.ab-tests.index')
            ->with('success', 'A/B test updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ABTest $abTest)
    {
        $abTest->delete();

        return redirect()
            ->route('admin.ab-tests.index')
            ->with('success', 'A/B test deleted successfully!');
    }
}
