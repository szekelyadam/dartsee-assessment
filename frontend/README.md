# Dartsee Assessment - Frontend

This is the frontend user interface for the Dartsee assessment, built cleanly using [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/).

## Purpose

The frontend is a modern single-page application (SPA) scaffolding designed to integrate seamlessly with the Dartsee backend API. It's built to construct the visualizations needed to display dart game statistics, individual player scoreboards, and custom analytic graphics such as the game-type popularity pie-charts requested during the assessment.

## Tech Stack

- **[React](https://react.dev/)** - Core frontend UI rendering library.
- **[TypeScript](https://www.typescriptlang.org/)** - For stringent type safety and integrated development environment (IDE) support.
- **[Vite](https://vitejs.dev/)** - Handles instantaneous, ultra-fast Hot Module Replacement (HMR) and optimized build environments.
- **Standard CSS** - Maintaining lean, unbloated stylesheet architectures.

## Setup & Installation

Make sure your environment is running an updated Long-Term Support (LTS) version of Node.js.

```bash
# 1. Ensure you are in the frontend directory
$ cd frontend

# 2. Install the application dependencies
$ npm install
```

## Running the Application

```bash
# Start the blazing fast development server with HMR enabled
# Expected default URL: http://localhost:5173
$ npm run dev

# Create an optimized build asset batch for traditional production servers
$ npm run build

# Boot a localized server to visibly preview the /dist production build behavior
$ npm run preview
```

## Development and Backend Integration

This frontend codebase expects the `Dartsee Backend API` to be actively running in order to fetch and manipulate standard data entries. Typically, the backend rests alongside at `http://localhost:3000`. Be sure to boot up the backend module in parallel during active development to avoid unfulfilled data requests.
