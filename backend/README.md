# Dartsee Assessment - Backend API

This is the backend HTTP API for the Dartsee assessment, built using [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/). It interfaces with a local SQLite database (`database/dartsee.sqlite`) to query and calculate detailed statistics about darts games, players, and individual dart throws.

## Features & Endpoints

The REST API exposes the following primary routing endpoints:

- **`GET /games`**
  Fetches a list of all raw game records found in the database.

- **`GET /games/popularity`**
  Retrieves a breakdown of how many games have been played per game type (e.g., `501`, `cricket`). This endpoint aggregates data logically and is perfectly formatted for building visual pie charts.

- **`GET /games/:id`**
  Returns a comprehensive detail view of a specific game. It dynamically calculates and injects business metrics:
  - Lists all players participating in the specific game.
  - **`averageScorePerRound`**: Calculates the average sum score mathematically by grouping every 3 chronologically subsequent darts into a single "round".
  - **`missCount`**: Tracks how many times a player missed the board completely (distinguished mechanically by a throw `modifier` of `0`).

## Tech Stack

- **[NestJS](https://nestjs.com/)** - The primary progressive Node.js framework used for structuring the API server.
- **[TypeORM](https://typeorm.io/)** - The ORM layer used alongside standard SQL `QueryBuilder` logic to communicate with the DB efficiently.
- **SQLite3** - The database engine utilized to execute and fetch data queries without extra dedicated infrastructure.
- **[Jest](https://jestjs.io/)** - Handles testing suites.

## Setup & Installation

Ensure you have a recent version of Node.js installed locally.

```bash
# Install the project dependencies
$ npm install
```

## Running the Application

```bash
# standard development mode
$ npm run start

# watch mode (auto-refreshes on file changes)
$ npm run start:dev

# production build execution
$ npm run start:prod
```

## Testing

The backend includes comprehensive Unit and End-to-End (e2e) tests to ensure data manipulation queries and algorithmic calculation standards remain intact across updates.

```bash
# Run native unit tests (tests Controllers, Services, algorithms, and QueryBuilder outputs)
$ npm run test

# Run active E2E tests (tests authentic HTTP endpoints testing the API router layers)
$ npm run test:e2e
```

## License

NestJS related templating is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
