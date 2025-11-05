<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        // Get the admin user
        $user = User::where('email', env('ADMIN_EMAIL', 'albin.rushiti2004@gmail.com'))->first();
        if (!$user) {
            $user = User::first();
        }

        // Create posts based on current database data
        $posts = [
            [
                'title' => 'Building a Portfolio Website in 3 Hours: A Developer\'s Speed Run',
                'slug' => 'building-a-portfolio-website-in-3-hours-a-developers-speed-run',
                'excerpt' => 'How I transformed my career prospects by building a complete portfolio website in just 3 hours using modern web technologies. A step-by-step breakdown of the process, tools, and strategies that made it possible.',
                'content' => '<h2>The Challenge: Portfolio in 3 Hours</h2>

<p>As a developer, I\'ve always believed that the best way to showcase your skills is through action, not just words. So when I decided to revamp my portfolio, I set myself an ambitious challenge: build a complete, professional portfolio website in just 3 hours.</p>

<p>Spoiler alert: I did it. And in this post, I\'ll show you exactly how.</p>

<h2>The Tech Stack: Choosing Speed Over Perfection</h2>

<p>The key to completing this challenge was choosing the right tools. Here\'s what I went with:</p>

<ul>
<li><strong>Laravel 11</strong> - For the robust backend and database management</li>
<li><strong>Inertia.js</strong> - Seamless SPA experience without API complexity</li>
<li><strong>React + TypeScript</strong> - Type-safe frontend development</li>
<li><strong>Tailwind CSS</strong> - Rapid UI development</li>
<li><strong>SQLite</strong> - Zero-config database setup</li>
</ul>

<h2>Hour 1: Foundation and Setup (0-60 minutes)</h2>

<p>The first hour was all about getting the foundation right:</p>

<h3>Minutes 0-15: Project Initialization</h3>
<pre><code>composer create-project laravel/laravel portfolio
cd portfolio
composer require inertiajs/inertia-laravel tightenco/ziggy
npm install @inertiajs/react react react-dom @types/react
npm install -D @vitejs/plugin-react typescript</code></pre>

<h3>Minutes 15-30: Core Configuration</h3>
<p>I quickly configured Inertia.js, set up TypeScript, and created the basic layout structure. The key here was using pre-built component libraries to avoid reinventing the wheel.</p>

<h3>Minutes 30-60: Database Design</h3>
<p>Designed and migrated essential tables: posts, projects, categories, and users. SQLite meant zero database server configuration time.</p>

<h2>Hour 2: Core Features (60-120 minutes)</h2>

<p>The second hour focused on implementing the core functionality:</p>

<h3>Authentication System</h3>
<p>Laravel Fortify made authentication setup trivial. In under 20 minutes, I had a complete login system with proper security measures.</p>

<h3>Dynamic Components</h3>
<p>I built reusable components that would make the site stand out:</p>
<ul>
<li>FaultyTerminal - A retro terminal animation background</li>
<li>SpotlightCard - Interactive cards with hover effects</li>
<li>PillNav - Smooth navigation with active states</li>
</ul>

<h3>Content Management</h3>
<p>Created admin controllers for managing blog posts and projects. The beauty of Laravel\'s resource controllers meant CRUD operations were ready in minutes.</p>

<h2>Hour 3: Polish and Deploy (120-180 minutes)</h2>

<p>The final hour was about refinement and going live:</p>

<h3>Responsive Design</h3>
<p>Tailwind\'s utility classes made responsive design incredibly fast. Mobile-first approach ensured the site looked great on all devices.</p>

<h3>Performance Optimization</h3>
<ul>
<li>Lazy loading for components</li>
<li>Optimized database queries with eager loading</li>
<li>Minified CSS and JavaScript</li>
</ul>

<h3>Content Creation</h3>
<p>Added initial content, projects, and blog posts to make the portfolio feel complete and professional.</p>

<h2>The Results</h2>

<p>In exactly 3 hours, I had:</p>
<ul>
<li>A fully responsive portfolio website</li>
<li>Complete admin panel for content management</li>
<li>Blog system with tagging and categories</li>
<li>Project showcase with filtering</li>
<li>Contact form with email integration</li>
<li>Modern, interactive UI with animations</li>
</ul>

<h2>Key Takeaways</h2>

<p><strong>1. Preparation is Everything</strong><br>
Having a clear tech stack and design vision before starting was crucial.</p>

<p><strong>2. Leverage Modern Tools</strong><br>
Laravel, Inertia.js, and Tailwind CSS eliminated countless hours of boilerplate code.</p>

<p><strong>3. MVP First, Polish Later</strong><br>
Focus on core functionality first. You can always refine the details later.</p>

<p><strong>4. Component Reusability</strong><br>
Building reusable components early pays dividends as the project grows.</p>

<h2>What\'s Next?</h2>

<p>While 3 hours gave me a solid foundation, a portfolio is never truly "finished." Next steps include:</p>
<ul>
<li>Adding more interactive animations</li>
<li>Implementing A/B testing for optimization</li>
<li>SEO optimization and meta tags</li>
<li>Analytics integration</li>
</ul>

<p>The 3-hour challenge proved that with the right tools and mindset, you can build something impressive incredibly quickly. Sometimes the best way to start is just to start – and set a timer.</p>

<p>Want to see the code? Check out my GitHub repository for the complete source code and deployment instructions.</p>',
                'status' => 'published',
                'published_at' => '2025-11-03 22:25:00',
                'category_name' => 'Web Development',
                'tags' => ['Laravel', 'React', 'Portfolio', 'Speed Development']
            ],
            [
                'title' => 'Building an AI-Powered TI-84 Calculator with ESP32: When Retro Meets Modern',
                'slug' => 'building-an-ai-powered-ti-84-calculator-with-esp32-when-retro-meets-modern',
                'excerpt' => 'How I transformed a classic TI-84 calculator into an AI-powered device using ESP32, creating a bridge between nostalgic hardware and cutting-edge machine learning capabilities.',
                'content' => '<h2>The Idea: Nostalgia Meets Innovation</h2>

<p>Remember the TI-84? That chunky graphing calculator that got you through high school math? I had one sitting in my drawer, and instead of letting it collect dust, I decided to give it a modern twist: AI capabilities powered by an ESP32 microcontroller.</p>

<p>The result? A retro calculator that can solve complex problems using machine learning, process natural language queries, and even generate mathematical insights – all while maintaining that classic TI-84 charm.</p>

<h2>The Hardware Setup</h2>

<p>Here\'s what I used to bring this project to life:</p>

<ul>
<li><strong>TI-84 Plus Calculator</strong> - The foundation and interface</li>
<li><strong>ESP32-WROOM-32</strong> - The brains of the operation</li>
<li><strong>OLED Display (128x64)</strong> - Additional visual feedback</li>
<li><strong>Level Shifters</strong> - For safe communication between devices</li>
<li><strong>Custom PCB</strong> - To house all the new components</li>
<li><strong>LiPo Battery</strong> - Extended power for AI operations</li>
</ul>

<h2>The Challenge: Interfacing with Legacy Hardware</h2>

<p>The biggest challenge was interfacing modern components with 20-year-old calculator hardware. The TI-84 uses a proprietary communication protocol, and its I/O ports operate at different voltage levels than modern microcontrollers.</p>

<h3>Reverse Engineering the TI-84</h3>

<p>I spent weeks analyzing the calculator\'s communication protocols:</p>

<pre><code>// ESP32 code to communicate with TI-84
void sendToTI84(String command) {
    // Convert to TI-84 protocol format
    byte[] packet = formatTIPacket(command);
    
    // Send via custom serial interface
    tiSerial.write(packet, packet.length);
}</code></pre>

<h2>The Software Architecture</h2>

<p>The software stack consists of multiple layers:</p>

<h3>1. ESP32 Firmware (C++)</h3>
<p>Handles hardware communication, WiFi connectivity, and local processing.</p>

<h3>2. Cloud AI Service (Python/FastAPI)</h3>
<p>Processes complex mathematical queries using machine learning.</p>

<h3>3. TI-84 Display Integration</h3>
<p>Modified the calculator\'s display routines to show AI responses.</p>

<h2>AI Capabilities</h2>

<p>The enhanced calculator can now:</p>

<h3>Natural Language Math Solving</h3>
<ul>
<li>"What\'s the derivative of x² + 3x?"</li>
<li>"Solve the quadratic equation 2x² - 4x + 1 = 0"</li>
<li>"Graph the function f(x) = sin(x) + cos(2x)"</li>
</ul>

<p>This project demonstrates how we can breathe new life into classic devices while preserving their original charm. Sometimes the best innovations come from asking "What if?" about the devices we take for granted.</p>',
                'status' => 'published',
                'published_at' => '2025-11-01 22:25:58',
                'category_name' => 'Hardware Projects',
                'tags' => ['ESP32', 'AI', 'Hardware', 'Calculator']
            ],
        ];

        foreach ($posts as $postData) {
            // Find or create category
            $category = Category::where('name', $postData['category_name'])->first();
            if (!$category) {
                $category = Category::create([
                    'name' => $postData['category_name'],
                    'slug' => \Str::slug($postData['category_name']),
                    'color' => '#3B82F6',
                    'is_active' => true,
                ]);
            }

            $tags = $postData['tags'];
            unset($postData['tags'], $postData['category_name']);
            
            $postData['category_id'] = $category->id;
            $postData['user_id'] = $user->id;
            
            $post = Post::updateOrCreate(
                ['slug' => $postData['slug']],
                $postData
            );
            
            $post->syncTags($tags);
        }
    }
}
