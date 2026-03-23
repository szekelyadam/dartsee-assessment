# 🎯 Dartsee Assessment - Full Stack Platform

A modern, high-performance platform for tracking and analyzing darts matches, built with a focus on data accuracy, professional UI/UX, and comprehensive testing. This project serves as a technical assessment demonstrating a complete full-stack implementation.

## 🚀 Quick Start

Get the entire platform (Frontend + Backend) running in seconds:

1. **Install all dependencies:**

   ```bash
   npm run install:all
   ```

2. **Configure environment variables:**

   ```bash
   cp frontend/.env.example frontend/.env
   ```

3. **Start the application:**
   ```bash
   npm start
   ```
   _This will concurrently boot the **Backend** (port 3000) and the **Frontend** (port 5173)._

---

## 🏗️ Project Architecture

The repository is organized as a monorepo-style structure for clarity and ease of development:

### [Backend](./backend) (NestJS + TypeORM)

- **Domain-Driven Design**: Structured into modular features (`games`, `players`).
- **Complex Analytics**: SQL-driven calculations for "Average Score Per Round" using 3-throw grouping logic.
- **High Performance**: Optimized `QueryBuilder` implementations with aggregate filtering and sorting.
- **SQLite Integration**: Utilizing a local database for seamless evaluation without external infrastructure.

### [Frontend](./frontend) (React + Vite)

- **Modern Tech Stack**: Leveraging **TanStack** (Router, Query, Table) for type-safe routing, state management, and powerful data grids.
- **Data Visualization**: Interactive pie charts powered by **Recharts**.
- **Responsive UI**: A premium design system built with custom CSS/Tailwind, featuring smooth micro-animations and intuitive navigation.
- **Component Architecture**: Highly reusable atomic components (e.g., `PlayerInitialsAvatar`, `LoadingIndicator`).

---

## ✨ Key Features & "Bonus" Implementations

Next to the core requirements, I chose the following feature as a bonus task:

- **🏆 Global Leaderboard**: A simple performance ranking system that calculates global averages and miss rates, featuring client-side pagination.

---

## 🧪 Quality Assurance & Testing

The project maintains high standards of stability, with a tests suite covering both backend and frontend layers:

| Component    | Test Type           | Coverage Scope                            | Count |
| ------------ | ------------------- | ----------------------------------------- | ----- |
| **Backend**  | **Unit Tests**      | Services, Controllers, Algorithms         | 20    |
| **Backend**  | **E2E Tests**       | HTTP API, Routing, Data Persistence       | 10    |
| **Frontend** | **Component Tests** | UI Consistency, Routing, User Interaction | 10    |

**Running tests:**

```bash
# Backend tests
cd backend && npm run test && npm run test:e2e

# Frontend tests
cd frontend && npm run test
```

---

## 🛠️ Tech Stack Summary

- **Frontend**: React 18, Vite, TypeScript, TanStack (Router, Query, Table), Recharts, Vitest.
- **Backend**: NestJS, Node.js, TypeORM, SQLite, Jest, Supertest.
- **DevOps**: Concurrently (multi-process orchestrator).

---

## Room for improvement

- The database is currently using SQLite, but it would be better to use a more robust database like PostgreSQL.
- Also, the DB is shipped with the code, which is not ideal for a production environment, it's only like this for the sake of the assessment.
- The game list loads all the games at once, which is not ideal for a production environment, it should be paginated (maybe with infinite scroll?)
- The leaderboard is paginated on the client side, which is fine for this many players, but it would be better to paginate on the server side for a production environment.
- Leaderboard could be more comprehensive, with more statistics, filters, and sorting
- Game logs and leaderboard could be searchable and filterable
