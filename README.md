# Items Microservice

A Node.js microservice built with Express.js and MongoDB that provides CRUD operations for items with clean architecture, input validation, and comprehensive error handling.

## Features

- CRUD operations for Items (Create, Read, Update, Delete)
- Search functionality - Filter items by name (case-insensitive)
- Health check endpoint with status monitoring
- MongoDB integration with connection management
- Error handling middleware with proper error formatting
- Consistent API response format
- Environment variable configuration
- Input validation with Zod schemas
- Clean architecture with Controllers, Services, and DTOs
- Duplicate name checking
- Graceful shutdown handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://<username>:<password>/<dbname>
NODE_ENV=development
```

## Running the Application

Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Health Check

- **GET** `/health` - Returns application status, database connection status, and uptime

### Items API

- **POST** `/api/items` - Create a new item
- **GET** `/api/items` - Retrieve all items (with optional search)
- **GET** `/api/items?search=<name>` - Search items by name
- **GET** `/api/items/:id` - Retrieve a single item by ID
- **PUT** `/api/items/:id` - Update an item by ID
- **DELETE** `/api/items/:id` - Delete an item by ID

## API Documentation
For API documentation - **http://localhost:{PORT}/api-docs**
