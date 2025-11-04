<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('a_b_test_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('a_b_test_id')->constrained()->onDelete('cascade');
            $table->string('variant_id');
            $table->string('session_id');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->enum('event_type', ['view', 'conversion']);
            $table->json('metadata')->nullable(); // Additional event data
            $table->timestamps();
            
            $table->index(['a_b_test_id', 'variant_id', 'event_type']);
            $table->index(['session_id', 'event_type', 'created_at']);
            $table->index(['user_id', 'event_type', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('a_b_test_events');
    }
};
