<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ABTestEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'a_b_test_id',
        'variant_id',
        'session_id',
        'user_id',
        'event_type',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function abTest(): BelongsTo
    {
        return $this->belongsTo(ABTest::class, 'a_b_test_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}