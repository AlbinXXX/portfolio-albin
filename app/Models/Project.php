<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Tags\HasTags;

class Project extends Model implements HasMedia, Sortable
{
    use HasSlug, InteractsWithMedia, HasTags, SortableTrait;
    
    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'status',
        'featured_image',
        'gallery_images',
        'technologies',
        'live_url',
        'github_url',
        'sort_order',
        'is_featured',
        'completed_at',
    ];
    
    protected $casts = [
        'gallery_images' => 'array',
        'technologies' => 'array',
        'is_featured' => 'boolean',
        'completed_at' => 'datetime',
    ];
    
    public $sortable = [
        'order_column_name' => 'sort_order',
        'sort_when_creating' => true,
    ];
    
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }
    
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }
    
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }
    
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
    
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('featured_image')
              ->singleFile()
              ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
              
        $this->addMediaCollection('gallery')
              ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
    }
    
    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb')
              ->width(300)
              ->height(200)
              ->sharpen(10);
              
        $this->addMediaConversion('featured')
              ->width(800)
              ->height(600)
              ->sharpen(10);
              
        $this->addMediaConversion('gallery')
              ->width(600)
              ->height(400)
              ->sharpen(10);
    }
}
