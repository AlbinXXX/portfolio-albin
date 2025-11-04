export interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  color: string;
  technologies: string[];
  github?: string;
  demo?: string;
  category: 'web' | 'mobile' | 'desktop' | 'other';
}

export const projects: Project[] = [
  {
    id: 'portfolio-website',
    name: 'Portfolio Website',
    description: 'Modern portfolio built with Laravel, React, and cutting-edge animations',
    image: '/projects/portfolio.jpg',
    color: '#6366f1',
    technologies: ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'Inertia.js'],
    github: 'https://github.com/AlbinXXX/portfolio',
    demo: '/',
    category: 'web'
  },
  {
    id: 'ab-testing-dashboard',
    name: 'A/B Testing Dashboard',
    description: 'Real-time analytics dashboard for tracking conversion experiments',
    image: '/projects/ab-testing.jpg',
    color: '#ec4899',
    technologies: ['Laravel', 'React', 'MySQL', 'Redis', 'Chart.js'],
    github: 'https://github.com/AlbinXXX/ab-testing-dashboard',
    demo: '/ab-test-analytics',
    category: 'web'
  },
  {
    id: 'ecommerce-platform',
    name: 'E-commerce Platform',
    description: 'Full-featured e-commerce solution with payment integration',
    image: '/projects/ecommerce.jpg',
    color: '#10b981',
    technologies: ['Laravel', 'Vue.js', 'Stripe', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/AlbinXXX/ecommerce-platform',
    category: 'web'
  },
  {
    id: 'task-management',
    name: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    image: '/projects/task-management.jpg',
    color: '#f59e0b',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'TypeScript'],
    github: 'https://github.com/AlbinXXX/task-management',
    category: 'web'
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    description: 'Microservices API gateway with rate limiting and authentication',
    image: '/projects/api-gateway.jpg',
    color: '#8b5cf6',
    technologies: ['Node.js', 'Express', 'Redis', 'JWT', 'Docker'],
    github: 'https://github.com/AlbinXXX/api-gateway',
    category: 'web'
  },
  {
    id: 'mobile-fitness',
    name: 'Fitness Tracker',
    description: 'Cross-platform mobile app for fitness tracking and workouts',
    image: '/projects/fitness-tracker.jpg',
    color: '#ef4444',
    technologies: ['React Native', 'TypeScript', 'SQLite', 'Firebase'],
    github: 'https://github.com/AlbinXXX/fitness-tracker',
    category: 'mobile'
  }
];

export default projects;