<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ABTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\ABTest::create([
            'name' => 'homepage-hero',
            'description' => 'Testing different hero section headlines and CTA buttons on the homepage',
            'variants' => [
                [
                    'id' => 'control',
                    'name' => 'Original Hero',
                    'weight' => 50,
                ],
                [
                    'id' => 'variant-a',
                    'name' => 'Bold Statement',
                    'weight' => 30,
                ],
                [
                    'id' => 'variant-b', 
                    'name' => 'Question Hook',
                    'weight' => 20,
                ],
            ],
            'active' => true,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        \App\Models\ABTest::create([
            'name' => 'contact-cta',
            'description' => 'Testing different call-to-action button text and colors for contact form',
            'variants' => [
                [
                    'id' => 'control',
                    'name' => 'Get In Touch',
                    'weight' => 50,
                ],
                [
                    'id' => 'variant-a',
                    'name' => 'Let\'s Talk',
                    'weight' => 50,
                ],
            ],
            'active' => true,
            'start_date' => now(),
            'end_date' => now()->addDays(14),
        ]);

        \App\Models\ABTest::create([
            'name' => 'blog-layout',
            'description' => 'Testing different blog post layout styles and reading experience',
            'variants' => [
                [
                    'id' => 'control',
                    'name' => 'Standard Layout',
                    'weight' => 40,
                ],
                [
                    'id' => 'variant-a',
                    'name' => 'Wide Layout',
                    'weight' => 30,
                ],
                [
                    'id' => 'variant-b',
                    'name' => 'Minimal Layout',
                    'weight' => 30,
                ],
            ],
            'active' => false, // Not yet started
            'start_date' => now()->addDays(7),
            'end_date' => now()->addDays(21),
        ]);
    }
}
