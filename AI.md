# webapppp - AI Reference Guide

## Project Overview
Modern productivity web application built with React 19, TypeScript, and Material-UI 7. Features include task management, planning, pomodoro timer, health tracking, and financial savings tracking.

## Tech Stack
- React 19 + TypeScript
- Material-UI 7 + Emotion
- Framer Motion (animations)
- Lucide React (icons)
- Chart.js + React-ChartJS-2
- React Router 7
- SCSS Modules
- Vite (build tool)

## Project Structure
- `/src/components/` - Reusable UI components
- `/src/views/` - Page components (Dashboard, Tasks, Planner, etc.)
- `/src/services/` - API/business logic
- `/src/types/` - TypeScript type definitions
- `/src/routes/` - Routing configuration
- `/src/repositories/` - Data access
- `/src/assets/` - Static assets

## Development Setup
- Node.js environment managed with nvm
- Before running any npm commands, activate nvm first:
  ```bash
  source $(brew --prefix nvm)/nvm.sh
  ```
- Run development server:
  ```bash
  npm run dev
  ```

## Key Components
### Planner (`/src/views/Planner/index.tsx`)
- Three-tab interface: Schedule, Focus Times, Suggestions
- Day navigation with work/personal event filtering
- Timeline view with golden hours highlighting
- AI-generated productivity suggestions

### Tasks (`/src/views/Tasks/`)
- Task list with filtering capabilities
- Components potentially reusable in other views (Pomodoro)

### Common UI Patterns
- Material-UI components with custom theme
- Mobile/desktop responsive layouts
- Lucide icons for consistent visual language
- Motion animations for enhanced UX

## Component Reusability Note
Tasks component is a candidate for reuse in the Pomodoro view to maintain consistency and improve development efficiency.

## Services
### API Service (`/src/services/apiService.ts`)
- Centralized HTTP request handling with environment variable configuration
- Supports all standard methods (GET, POST, PUT, PATCH, DELETE)
- Type-safe request and response handling with generics
- Features:
  - Automatic error handling and standardized responses
  - Request timeout with AbortController
  - Query parameter building
  - Authorization header management
- Usage: `import { apiService } from 'src/services'`
- Environment setup:
  - `VITE_API_URL`: Base URL for API requests
  - `VITE_API_KEY`: API key for authorization

## Theme System
### Theme Provider (`/src/theme.tsx`)
- Provides dark/light mode toggle functionality across the application
- Persists theme preference in localStorage
- Respects system preference on initial load
- Features:
  - Context-based theme sharing
  - Dynamic CSS variables
  - Smooth transitions between themes
  - Material-UI theme integration
- Usage: `import { useColorModeContext } from '../../theme.tsx'`
- Implementation:
  - Theme toggle in DesktopSidebar
  - Theme toggle in Profile settings

## Known Issues
- Various TypeScript errors related to MUI component props (Grid, ListItem) that don't affect functionality
- Unused imports in some components that should be cleaned up