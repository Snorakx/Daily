# Smart Planner - Modern SaaS Web App

A modern SaaS web application built with React, TypeScript, and Material UI. Smart Planner is a productivity and wellness tool that helps you manage tasks, plan your day, track health metrics, and monitor your financial goals.

## Features

- **Tasks Management**: Track and organize daily tasks with filters and sorting
- **AI Planner**: Get AI-generated schedules and optimize your productivity
- **Pomodoro Timer**: Stay focused with a customizable pomodoro technique timer
- **Health Tracking** (Premium): Monitor workouts, diet, habits, and supplements
- **Financial Goals** (Premium): Track savings goals and manage your budget
- **Modern UI**: Mobile-first responsive design with dark mode support

## Technology Stack

- React 18 with TypeScript
- Vite for fast development and optimized builds
- Material UI (MUI v5+) for components and styling
- SCSS Modules for component styling
- React Router v6 for navigation
- Framer Motion for animations
- Lucide React for icons
- Chart.js for data visualization

## Project Structure

```
src/
├── components/          // Reusable UI elements
├── views/               // Screens per feature
├── services/            // Business logic + local state
├── repositories/        // API integration
├── types/               // TypeScript interfaces
├── routes/              // Navigation structure
└── main.tsx             // Entry point
```

## Architecture

The application follows a modular architecture with clear separation of concerns:

- **Repository Layer**: Handles data fetching and API integration
- **Service Layer**: Contains business logic and state management
- **View Layer**: Renders UI components and handles user interactions

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## PWA Support

The application is designed as a Progressive Web App (PWA) and can be installed on mobile devices and desktops for a native app-like experience.

## Subscription Plans

- **Free**: Basic task management and planning
- **Pro** ($20/month): AI Planner and Pomodoro features
- **Full** ($30/month): All features including Health and Financial tracking

## License

MIT
