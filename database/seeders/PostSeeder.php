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
        // Get the first user, or create one if none exists
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Albin Rushiti',
                'email' => 'albin@example.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]);
        }

        // Create categories if they don't exist
        $categories = [
            'Web Development',
            'React',
            'Laravel',
            'TypeScript',
        ];

        foreach ($categories as $categoryName) {
            Category::firstOrCreate(['name' => $categoryName]);
        }

        $webDevCategory = Category::where('name', 'Web Development')->first();
        $reactCategory = Category::where('name', 'React')->first();
        $laravelCategory = Category::where('name', 'Laravel')->first();

        $posts = [
            [
                'title' => 'Building A/B Testing Systems with React and Laravel',
                'excerpt' => 'Learn how to implement a complete A/B testing framework with real-time analytics and conversion tracking.',
                'content' => '
                    <h2>Introduction</h2>
                    <p>A/B testing is a crucial part of modern web development that allows us to make data-driven decisions about our user interfaces and user experiences.</p>
                    
                    <h2>Setting Up the Backend</h2>
                    <p>We\'ll start by creating our Laravel backend to handle A/B test configurations and track user interactions.</p>
                    
                    <h3>Database Schema</h3>
                    <pre><code>
Schema::create(\'ab_tests\', function (Blueprint $table) {
    $table->id();
    $table->string(\'name\');
    $table->json(\'variants\');
    $table->boolean(\'is_active\')->default(false);
    $table->timestamps();
});
                    </code></pre>
                    
                    <h2>Frontend Implementation</h2>
                    <p>On the React side, we\'ll create a hook that automatically assigns users to test variants and tracks their behavior.</p>
                    
                    <h2>Analytics Dashboard</h2>
                    <p>Finally, we\'ll build a real-time analytics dashboard to monitor test performance and statistical significance.</p>
                ',
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'category_id' => $webDevCategory->id,
                'user_id' => $user->id,
                'tags' => ['React', 'Laravel', 'A/B Testing', 'Analytics']
            ],
            [
                'title' => 'Modern TypeScript Patterns for React Development',
                'excerpt' => 'Explore advanced TypeScript patterns that can improve your React applications\' type safety and developer experience.',
                'content' => '
                    <h2>Why TypeScript with React?</h2>
                    <p>TypeScript brings static type checking to JavaScript, making our React applications more robust and maintainable.</p>
                    
                    <h2>Advanced Generic Patterns</h2>
                    <p>Let\'s explore some powerful generic patterns that can make your React components more flexible and type-safe.</p>
                    
                    <h3>Generic Component Props</h3>
                    <pre><code>
interface GenericProps&lt;T&gt; {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List&lt;T&gt;({ data, renderItem }: GenericProps&lt;T&gt;) {
  return (
    &lt;ul&gt;
      {data.map((item, index) =&gt; (
        &lt;li key={index}&gt;{renderItem(item)}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
                    </code></pre>
                    
                    <h2>Conditional Types</h2>
                    <p>Learn how to use conditional types to create more intelligent component APIs.</p>
                ',
                'status' => 'published',
                'published_at' => now()->subDays(7),
                'category_id' => $reactCategory->id,
                'user_id' => $user->id,
                'tags' => ['TypeScript', 'React', 'Patterns', 'Development']
            ],
            [
                'title' => 'Setting Up Laravel with Inertia.js and React',
                'excerpt' => 'A complete guide to building modern full-stack applications with Laravel backend and React frontend using Inertia.js.',
                'content' => '
                    <h2>What is Inertia.js?</h2>
                    <p>Inertia.js allows you to build single-page applications using classic server-side routing and controllers.</p>
                    
                    <h2>Installation and Setup</h2>
                    <p>Let\'s start by setting up a fresh Laravel project with Inertia.js and React.</p>
                    
                    <h3>Backend Setup</h3>
                    <pre><code>
composer create-project laravel/laravel my-app
composer require inertiajs/inertia-laravel
                    </code></pre>
                    
                    <h3>Frontend Setup</h3>
                    <pre><code>
npm install @inertiajs/react react react-dom
npm install -D @vitejs/plugin-react
                    </code></pre>
                    
                    <h2>Creating Your First Page</h2>
                    <p>Now let\'s create a simple React component and render it from a Laravel controller.</p>
                    
                    <h2>Advanced Features</h2>
                    <p>Explore forms, validation, and other advanced Inertia.js features that make full-stack development a breeze.</p>
                ',
                'status' => 'published',
                'published_at' => now()->subDays(14),
                'category_id' => $laravelCategory->id,
                'user_id' => $user->id,
                'tags' => ['Laravel', 'Inertia.js', 'React', 'Full-Stack']
            ],
        ];

        foreach ($posts as $postData) {
            $tags = $postData['tags'];
            unset($postData['tags']);
            
            $post = Post::create($postData);
            $post->attachTags($tags);
        }
    }
}
