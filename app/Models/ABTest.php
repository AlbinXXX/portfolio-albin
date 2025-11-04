<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ABTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'variants',
        'active',
        'start_date',
        'end_date',
        'metadata',
    ];

    protected $casts = [
        'variants' => 'array',
        'metadata' => 'array',
        'active' => 'boolean',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function assignments(): HasMany
    {
        return $this->hasMany(ABTestAssignment::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(ABTestEvent::class);
    }

    // Scope for active tests
    public function scopeActive($query)
    {
        return $query->where('active', true)
            ->where(function ($q) {
                $q->whereNull('start_date')
                  ->orWhere('start_date', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('end_date')
                  ->orWhere('end_date', '>=', now());
            });
    }

    // Get metrics for this test
    public function getMetrics()
    {
        $variants = collect($this->variants);

        $totalAssignments = $this->assignments()->count();
        $totalViews = $this->events()->where('event_type', 'view')->count();
        $totalConversions = $this->events()->where('event_type', 'conversion')->count();

        // Get conversions by variant directly from events table
        $conversionsByVariant = $this->events()
            ->where('event_type', 'conversion')
            ->select('variant_id', DB::raw('count(*) as conversions'))
            ->groupBy('variant_id')
            ->pluck('conversions', 'variant_id')
            ->toArray();

        $metrics = [];
        foreach ($variants as $variant) {
            $variantId = is_array($variant) ? $variant['id'] : $variant;
            $conversions = $conversionsByVariant[$variantId] ?? 0;
            $assignments = $this->assignments()->where('variant', $variantId)->count();
            
            $metrics[$variantId] = [
                'assignments' => $assignments,
                'conversions' => $conversions,
                'conversion_rate' => $assignments > 0 ? ($conversions / $assignments) * 100 : 0,
            ];
        }

        return [
            'total_assignments' => $totalAssignments,
            'total_views' => $totalViews,
            'total_conversions' => $totalConversions,
            'conversion_rate' => $totalAssignments > 0 ? ($totalConversions / $totalAssignments) * 100 : 0,
            'variants' => $metrics,
        ];
    }

    // Check if test is currently running
    public function isRunning(): bool
    {
        if (!$this->active) {
            return false;
        }

        $now = now();
        
        if ($this->start_date && $this->start_date > $now) {
            return false;
        }
        
        if ($this->end_date && $this->end_date < $now) {
            return false;
        }
        
        return true;
    }
}