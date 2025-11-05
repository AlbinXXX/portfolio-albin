<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the admin user
        $user = User::where('email', env('ADMIN_EMAIL', 'albin.rushiti2004@gmail.com'))->first();
        if (!$user) {
            $user = User::first();
        }

        $projects = [
            [
                'title' => 'Portfolio Website',
                'slug' => 'portfolio-website',
                'description' => 'Modern portfolio built with Laravel, React, and cutting-edge animations',
                'content' => '<h2>About This Project</h2>
        <p>This portfolio website showcases my development skills through a modern, interactive interface built with cutting-edge web technologies.</p>
        
        <h3>Key Features</h3>
        <ul>
        <li>Server-side rendering with Laravel and Inertia.js</li>
        <li>Dynamic animations and interactive components</li>
        <li>Responsive design optimized for all devices</li>
        <li>Admin panel for content management</li>
        <li>Blog system with tagging and categories</li>
        </ul>
        
        <h3>Technical Highlights</h3>
        <p>Built using a modern tech stack focusing on performance and developer experience. The combination of Laravel\'s robust backend with React\'s interactive frontend creates a seamless user experience.</p>',
                'status' => 'active',
                'technologies' => ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'Inertia.js'],
                'live_url' => '/',
                'github_url' => 'https://github.com/yourusername/portfolio',
                'sort_order' => 1,
                'is_featured' => true,
                'completed_at' => '2025-10-04 22:36:00',
            ],
            [
                'title' => 'AI-Powered TI-84 Calculator',
                'slug' => 'ai-powered-ti-84-calculator',
                'description' => 'Enhanced classic calculator with ESP32 and machine learning capabilities',
                'content' => '<h2>Project Overview</h2>
        <p>A unique project that combines nostalgic hardware with modern AI capabilities, transforming a classic TI-84 calculator into an intelligent mathematical assistant.</p>
        
        <h3>Hardware Components</h3>
        <ul>
        <li>ESP32-WROOM-32 microcontroller</li>
        <li>Custom PCB design</li>
        <li>OLED display integration</li>
        <li>Level shifters for safe communication</li>
        </ul>
        
        <h3>AI Features</h3>
        <p>Natural language processing for mathematical queries, step-by-step solution explanations, and smart graph analysis powered by cloud-based machine learning models.</p>',
                'status' => 'active',
                'technologies' => ['ESP32', 'C++', 'Python', 'FastAPI', 'Machine Learning'],
                'live_url' => null,
                'github_url' => 'https://github.com/yourusername/ai-ti84',
                'sort_order' => 2,
                'is_featured' => true,
                'completed_at' => '2025-09-04 22:36:47',
            ],
            [
                'title' => 'E-commerce Platform',
                'slug' => 'e-commerce-platform',
                'description' => 'Full-featured e-commerce solution with payment integration and admin dashboard',
                'content' => '<h2>E-commerce Solution</h2>
        <p>A comprehensive e-commerce platform built to handle modern online retail needs with scalability and security in mind.</p>
        
        <h3>Core Features</h3>
        <ul>
        <li>Product catalog with advanced filtering</li>
        <li>Shopping cart and wishlist functionality</li>
        <li>Secure payment processing with Stripe</li>
        <li>Order management and tracking</li>
        <li>Admin dashboard for inventory management</li>
        </ul>
        
        <h3>Technical Architecture</h3>
        <p>Built with Laravel for robust backend functionality and Vue.js for a reactive user interface. PostgreSQL ensures data integrity while Docker containers provide consistent deployment environments.</p>',
                'status' => 'active',
                'technologies' => ['Laravel', 'Vue.js', 'Stripe', 'PostgreSQL', 'Docker'],
                'live_url' => null,
                'github_url' => 'https://github.com/yourusername/ecommerce-platform',
                'sort_order' => 3,
                'is_featured' => false,
                'completed_at' => '2025-08-04 22:36:47',
            ],
            [
                'title' => 'Task Management App',
                'slug' => 'task-management-app',
                'description' => 'Collaborative task management with real-time updates and team features',
                'content' => '<h2>Collaborative Task Management</h2>
        <p>A real-time collaborative task management application designed for modern teams who need efficient project coordination.</p>
        
        <h3>Key Features</h3>
        <ul>
        <li>Real-time collaboration with Socket.io</li>
        <li>Kanban boards and list views</li>
        <li>Team member assignments and notifications</li>
        <li>File attachments and comments</li>
        <li>Time tracking and reporting</li>
        </ul>
        
        <h3>Technical Implementation</h3>
        <p>React frontend with Node.js backend, using Socket.io for real-time updates and MongoDB for flexible data storage. TypeScript ensures type safety throughout the application.</p>',
                'status' => 'active',
                'technologies' => ['React', 'Node.js', 'Socket.io', 'MongoDB', 'TypeScript'],
                'live_url' => null,
                'github_url' => 'https://github.com/yourusername/task-management',
                'sort_order' => 4,
                'is_featured' => false,
                'completed_at' => '2025-07-04 22:36:47',
            ],
            [
                'title' => 'API Gateway Service',
                'slug' => 'api-gateway-service',
                'description' => 'Microservices API gateway with rate limiting, authentication, and monitoring',
                'content' => '<h2>Microservices API Gateway</h2>
        <p>A robust API gateway solution designed to handle microservices architecture with enterprise-grade features.</p>
        
        <h3>Features</h3>
        <ul>
        <li>Request routing and load balancing</li>
        <li>Rate limiting and throttling</li>
        <li>JWT authentication and authorization</li>
        <li>API monitoring and analytics</li>
        <li>Request/response transformation</li>
        </ul>
        
        <h3>Architecture</h3>
        <p>Built with Node.js and Express for high performance, Redis for caching and rate limiting, and Docker for containerized deployment. Comprehensive logging and monitoring included.</p>',
                'status' => 'active',
                'technologies' => ['Node.js', 'Express', 'Redis', 'JWT', 'Docker'],
                'live_url' => null,
                'github_url' => 'https://github.com/yourusername/api-gateway',
                'sort_order' => 5,
                'is_featured' => false,
                'completed_at' => '2025-06-04 22:36:47',
            ],
            [
                'title' => 'Mobile Fitness Tracker',
                'slug' => 'mobile-fitness-tracker',
                'description' => 'Cross-platform fitness tracking app with workout planning and progress analytics',
                'content' => '<h2>Fitness Tracking Application</h2>
        <p>A comprehensive cross-platform mobile application for fitness enthusiasts to track workouts, monitor progress, and achieve health goals.</p>
        
        <h3>Core Features</h3>
        <ul>
        <li>Workout logging and planning</li>
        <li>Progress tracking with charts</li>
        <li>Exercise library with instructions</li>
        <li>Social features and challenges</li>
        <li>Offline sync capabilities</li>
        </ul>
        
        <h3>Mobile Development</h3>
        <p>React Native ensures cross-platform compatibility while maintaining native performance. SQLite provides local data storage with Firebase for cloud sync and user authentication.</p>',
                'status' => 'active',
                'technologies' => ['React Native', 'TypeScript', 'SQLite', 'Firebase'],
                'live_url' => null,
                'github_url' => 'https://github.com/yourusername/fitness-tracker',
                'sort_order' => 6,
                'is_featured' => false,
                'completed_at' => '2025-05-04 22:36:47',
            ],
        ];

        foreach ($projects as $projectData) {
            Project::updateOrCreate(
                ['slug' => $projectData['slug']],
                $projectData
            );
        }
    }
}
