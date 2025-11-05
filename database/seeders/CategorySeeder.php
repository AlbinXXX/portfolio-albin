<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Web Development',
                'slug' => 'web-development',
                'description' => null,
                'color' => '#3B82F6',
                'is_active' => true,
            ],
            [
                'name' => 'React',
                'slug' => 'react',
                'description' => null,
                'color' => '#3B82F6',
                'is_active' => true,
            ],
            [
                'name' => 'Laravel',
                'slug' => 'laravel',
                'description' => null,
                'color' => '#3B82F6',
                'is_active' => true,
            ],
            [
                'name' => 'TypeScript',
                'slug' => 'typescript',
                'description' => null,
                'color' => '#3B82F6',
                'is_active' => true,
            ],
            [
                'name' => 'Hardware Projects',
                'slug' => 'hardware-projects',
                'description' => 'Articles about hardware and embedded projects',
                'color' => '#3B82F6',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::updateOrCreate(
                ['slug' => $categoryData['slug']],
                $categoryData
            );
        }
    }
}
