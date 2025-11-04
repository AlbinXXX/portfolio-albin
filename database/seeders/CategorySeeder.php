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
                'description' => 'Articles about web development, frameworks, and best practices',
                'color' => '#3B82F6', // Blue
            ],
            [
                'name' => 'Laravel',
                'description' => 'Deep dives into Laravel framework features and tutorials',
                'color' => '#EF4444', // Red
            ],
            [
                'name' => 'React',
                'description' => 'React development tips, hooks, and modern patterns',
                'color' => '#06B6D4', // Cyan
            ],
            [
                'name' => 'TypeScript',
                'description' => 'TypeScript guides and type-safe development practices',
                'color' => '#8B5CF6', // Purple
            ],
            [
                'name' => 'DevOps',
                'description' => 'Deployment, CI/CD, and infrastructure topics',
                'color' => '#10B981', // Green
            ],
            [
                'name' => 'Tutorial',
                'description' => 'Step-by-step tutorials and guides',
                'color' => '#F59E0B', // Yellow
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
