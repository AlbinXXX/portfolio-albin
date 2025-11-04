export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
    author: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Building A/B Testing Systems with React and Laravel",
        excerpt: "Learn how to implement a complete A/B testing framework with real-time analytics and conversion tracking.",
        publishedAt: "2025-11-04",
        readTime: "8 min read",
        tags: ["React", "Laravel", "A/B Testing", "Analytics"],
        author: "Albin Rushiti"
    },
    {
        id: 2,
        title: "Modern TypeScript Patterns for React Development",
        excerpt: "Explore advanced TypeScript patterns that can improve your React applications' type safety and developer experience.",
        publishedAt: "2025-10-28",
        readTime: "6 min read",
        tags: ["TypeScript", "React", "Patterns", "Development"],
        author: "Albin Rushiti"
    },
    {
        id: 3,
        title: "Setting Up Laravel with Inertia.js and React",
        excerpt: "A complete guide to building modern full-stack applications with Laravel backend and React frontend using Inertia.js.",
        publishedAt: "2025-10-15",
        readTime: "12 min read",
        tags: ["Laravel", "Inertia.js", "React", "Full-Stack"],
        author: "Albin Rushiti"
    },
    {
        id: 4,
        title: "Advanced WebGL Effects with Three.js",
        excerpt: "Dive deep into creating stunning visual effects and interactive 3D experiences using WebGL and Three.js.",
        publishedAt: "2025-09-22",
        readTime: "10 min read",
        tags: ["WebGL", "Three.js", "3D", "Graphics"],
        author: "Albin Rushiti"
    },
    {
        id: 5,
        title: "Building Scalable APIs with Laravel Sanctum",
        excerpt: "Learn how to build secure, scalable APIs using Laravel Sanctum for authentication and authorization.",
        publishedAt: "2025-09-10",
        readTime: "7 min read",
        tags: ["Laravel", "API", "Sanctum", "Authentication"],
        author: "Albin Rushiti"
    },
    {
        id: 6,
        title: "Optimizing React Performance with useMemo and useCallback",
        excerpt: "Master React optimization techniques to build faster, more efficient applications.",
        publishedAt: "2025-08-28",
        readTime: "5 min read",
        tags: ["React", "Performance", "Optimization", "Hooks"],
        author: "Albin Rushiti"
    }
];