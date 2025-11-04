<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $adminEmail = env('ADMIN_EMAIL');
        $adminPassword = env('ADMIN_PASSWORD');
        $adminName = env('ADMIN_NAME', 'Albin Rushiti');

        if (!$adminEmail || !$adminPassword) {
            $this->command->error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file');
            return;
        }

        // Create the main admin user
        User::updateOrCreate(
            ['email' => $adminEmail],
            [
                'name' => $adminName,
                'email' => $adminEmail,
                'password' => Hash::make($adminPassword),
                'email_verified_at' => now(),
            ]
        );

        // Remove any test users
        User::where('name', 'Test User')->delete();
        
        $this->command->info("Admin user created/updated: {$adminEmail}");
    }
}