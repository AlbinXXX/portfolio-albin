<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ABTestAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'a_b_test_id',
        'variant',
        'session_id',
        'user_id',
        'assigned_at',
    ];

    protected $casts = [
        'assigned_at' => 'datetime',
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