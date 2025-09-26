# 🚀 Laravel + React Project Guide for New Developers

This is a modern web application built with **Laravel** (backend) and **React with TypeScript** (frontend), designed to provide a solid foundation for building web applications with excellent developer experience.

## 🛠️ Technology Stack Overview

### Backend Framework

- **[Laravel 12](https://laravel.com/docs)** - A powerful PHP framework that provides elegant syntax and robust features for building web applications
- **[Inertia.js](https://inertiajs.com/)** - Creates a bridge between Laravel and React, allowing you to build single-page applications using classic server-side routing

### Frontend Framework

- **[React 19](https://react.dev/)** - A JavaScript library for building user interfaces with components
- **[TypeScript](https://www.typescriptlang.org/)** - Adds static type checking to JavaScript, helping catch errors early and improve code quality

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** - A utility-first CSS framework that lets you style components directly in your HTML/JSX using predefined classes
- **[Radix UI](https://www.radix-ui.com/)** - Provides accessible, unstyled UI components that work perfectly with Tailwind CSS

### Development Tools

- **[Vite](https://vitejs.dev/)** - Fast build tool that provides instant hot module replacement during development
- **[ESLint](https://eslint.org/)** - Code linting tool that helps maintain consistent code style
- **[Prettier](https://prettier.io/)** - Code formatter that automatically formats your code

## 📁 Project Structure

### 🔧 Core Configuration Files

```
├── composer.json          # PHP dependency management
├── package.json           # Node.js dependency management
├── artisan                # Laravel's command-line tool
├── vite.config.ts         # Frontend build configuration
├── tsconfig.json          # TypeScript configuration
└── .env                   # Environment variables (database, app settings)
```

### 🗂️ Backend Structure (Laravel/PHP)

#### `app/` - Your Application Logic

```
app/
├── Http/
│   ├── Controllers/       # Handle HTTP requests
│   │   └── Controller.php # Base controller class
│   └── Middleware/        # Process requests before/after controllers
│       └── HandleInertiaRequests.php # Bridges Laravel ↔ React
└── Providers/
    └── AppServiceProvider.php # Configure application services
```

**💡 Getting Started - Adding Backend Logic:**

- **New API endpoints**: Create controllers in `app/Http/Controllers/`
- **Database models**: Create in `app/Models/` (use `php artisan make:model ModelName`)
- **Middleware**: Add custom middleware in `app/Http/Middleware/`

#### `config/` - Application Configuration

```
config/
├── app.php              # Main app settings (name, environment, etc.)
├── database.php         # Database connection settings
├── auth.php            # Authentication configuration
└── ...                 # Other Laravel configurations
```

#### `database/` - Database Management

```
database/
├── migrations/          # Database schema changes (version control for DB)
├── seeders/            # Sample data generators
├── factories/          # Test data factories
└── database.sqlite     # SQLite database file
```

**💡 Getting Started - Database:**

- **New tables**: `php artisan make:migration create_table_name`
- **Sample data**: `php artisan make:seeder TableSeeder`
- **Run migrations**: `php artisan migrate`

#### `routes/` - URL Routing

```
routes/
├── web.php             # Web routes (where you define URLs)
└── console.php         # Artisan command routes
```

**💡 Getting Started - Adding Routes:**

```php
// In routes/web.php
Route::get('/about', function () {
    return Inertia::render('about'); // Renders resources/js/pages/about.tsx
});
```

### 🎨 Frontend Structure (React/TypeScript)

#### `resources/js/` - Your React Application

```
resources/js/
├── app.tsx                    # Main React entry point
├── ssr.tsx                   # Server-side rendering setup
├── pages/                    # Your application pages
│   └── welcome.tsx          # Homepage (example)
├── components/
│   └── ui/                  # Reusable UI components (buttons, inputs, etc.)
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       └── ...              # 20+ pre-built components
├── layouts/
│   └── app-layout.tsx       # Page layout wrapper
├── lib/
│   └── utils.ts            # Utility functions
└── types/
    ├── index.d.ts          # TypeScript type definitions
    └── vite-env.d.ts       # Vite environment types
```

**💡 Getting Started - Adding Frontend Features:**

#### **Creating New Pages:**

1. Create a new file in `resources/js/pages/`, e.g., `about.tsx`:

```tsx
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head title="About" />
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <h1 className="text-4xl font-bold">About Us</h1>
            </div>
        </>
    );
}
```

2. Add a route in `routes/web.php`:

```php
Route::get('/about', function () {
    return Inertia::render('about');
});
```

#### **Using UI Components:**

The project includes a complete set of pre-built components in `resources/js/components/ui/`:

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyPage() {
    return (
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Input placeholder="Your name" className="mb-4" />
                <Button>Submit</Button>
            </CardContent>
        </Card>
    );
}
```

#### **Styling with Tailwind CSS:**

Instead of writing CSS files, you use utility classes directly in your JSX:

```tsx
<div className="rounded-lg bg-blue-500 p-4 text-white shadow-md hover:bg-blue-600">
    <h2 className="mb-2 text-xl font-bold">Card Title</h2>
    <p className="text-blue-100">Card content goes here</p>
</div>
```

- `bg-blue-500` = blue background
- `text-white` = white text
- `p-4` = padding on all sides
- `rounded-lg` = rounded corners
- Learn more: [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### 📦 Dependencies & Build Tools

#### `node_modules/` & `vendor/`

```
node_modules/              # JavaScript/TypeScript packages
vendor/                    # PHP packages (Laravel, etc.)
```

#### `public/` - Static Assets

```
public/
├── build/                 # Compiled frontend assets (auto-generated)
├── index.php             # Laravel entry point
└── ...                   # Static files (images, icons)
```

#### `storage/` & `bootstrap/cache/`

```
storage/                   # File storage, logs, cache
bootstrap/cache/          # Laravel optimization cache
```

## 🚀 Getting Started Commands

### **Initial Setup:**

```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

# Set up database
touch database/database.sqlite  # Create database file
php artisan migrate            # Run database migrations
```

### **Development:**

```bash
# Start development server (with hot reloading)
npm run dev

# In another terminal, start Laravel server
php artisan serve
```

### **Building for Production:**

```bash
# Build optimized frontend assets
npm run build

# Clear Laravel caches
php artisan config:cache
php artisan route:cache
```

## 🎯 Common Development Tasks

### **Adding a New Feature Page:**

1. **Create the React component** in `resources/js/pages/feature-name.tsx`
2. **Add the route** in `routes/web.php`
3. **Style with Tailwind** classes and use UI components from `components/ui/`

### **Creating an API Endpoint:**

1. **Create controller**: `php artisan make:controller ApiController`
2. **Add routes** in `routes/web.php` or create `routes/api.php`
3. **Return data** to your React components via Inertia

### **Database Operations:**

1. **Create migration**: `php artisan make:migration create_posts_table`
2. **Create model**: `php artisan make:model Post`
3. **Run migration**: `php artisan migrate`

## 📚 Key Learning Resources

- **Laravel**: [Laravel Documentation](https://laravel.com/docs) - Complete PHP framework guide
- **React**: [React Documentation](https://react.dev/learn) - Learn React fundamentals
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type system basics
- **Tailwind CSS**: [Tailwind Documentation](https://tailwindcss.com/docs) - Utility-first CSS
- **Inertia.js**: [Inertia Documentation](https://inertiajs.com/) - Laravel ↔ React bridge

This setup provides you with a modern, type-safe, and efficient development environment that scales from simple websites to complex applications! 🎉

## 🤝 Contributing

When working on this project:

1. Create feature branches for new work
2. Use meaningful commit messages
3. Run `npm run lint` and `npm run types` before committing
4. Test your changes locally with `npm run dev`

Happy coding! 🚀
