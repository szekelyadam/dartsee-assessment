# Dartsee Assessment - Frontend

This is the frontend user interface for the Dartsee assessment, built using [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/). It provides a modern, responsive interface for exploring darts game statistics and player performance.

## Core Features

- **📊 Analytics & Visualizations**
  - Integrated **Recharts** for high-level data visualization.
  - Interactive **Pie Chart** displaying global game-type popularity.
  - Real-time data processing and formatting for visual clarity.

- **🏆 Player Leaderboard**
  - Comprehensive performance tracking across all historical games.
  - Metrics include: `Average Score Per Round`, `Total Games Played`, and `Misses Per Game`.
  - **Pagination** powered by `@tanstack/react-table`.
  - Automatic filtering for statistical significance (players with >5 games).

- **📂 Game History & Details**
  - Browseable archive of all recorded matches with summary cards.
  - Deep-dive detail views for specific games.
  - Calculation and display of per-player averages and miss counts within matches.

- **⚡ Modern UI/UX**
  - **Responsive Design**: Fluid layouts that work from mobile to desktop.
  - **Smart Avatars**: `PlayerInitialsAvatar` component for consistent, colorful player representation.
  - **Loading States**: Custom `LoadingIndicator` with smooth animations.
  - **Dynamic Theming**: Color-coded labels derived from game types.

## Tech Stack

- **[React](https://react.dev/)** - Core UI library.
- **[TanStack Router](https://tanstack.com/router)** - For type-safe routing and navigation.
- **[TanStack Query](https://tanstack.com/query)** - For efficient data fetching, caching, and state synchronization.
- **[TanStack Table](https://tanstack.com/table)** - For powerful and headless table logic.
- **[Recharts](https://recharts.org/)** - For declarative and responsive charts.
- **[Vitest](https://vitest.dev/)** - Blazing fast testing framework.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development.

## Setup & Installation

Ensure you have a recent version of Node.js (LTS) installed.

```bash
# Navigate to the frontend directory
$ cd frontend

# Install dependencies
$ npm install
```

## Running the Application

```bash
# Start the development server
$ npm run dev

# Build for production
$ npm run build

# Preview production build
$ npm run preview
```

## Testing

The frontend uses Vitest and React Testing Library to verify component rendering, logic, and helper functions.

| Test Category | Scope | Test Count |
|---|---|---|
| **Component Tests** | UI Consistency, Routing, Props | 7 |
| **Logic & Helpers** | Mathematical calculations, Formatting | 3 |

```bash
# Run all frontend tests
$ npm run test
```

## Backend Integration

This frontend connects to the `Dartsee Backend API` (running on `http://localhost:3000` by default). Ensure the backend is running for a complete experience.
