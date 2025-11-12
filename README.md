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
- **Swagger/OpenAPI documentation** - Interactive API documentation

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
MONGODB_URI=mongodb://localhost:27017/itemsdb
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

## API Documentation

### Swagger UI

Interactive API documentation is available at:

**http://localhost:{PORT}/api-docs**

(Replace `{PORT}` with your configured port from `.env` file, default is 3000)

The Swagger UI provides:
- Complete API endpoint documentation
- Request/response schemas
- Try-it-out functionality to test endpoints directly
- Example requests and responses
- Error response documentation

### API Endpoints

#### Health Check

- **GET** `/health` - Returns application status, database connection status, and uptime

#### Items API

- **POST** `/api/items` - Create a new item
- **GET** `/api/items` - Retrieve all items (with optional search)
- **GET** `/api/items?search=<name>` - Search items by name
- **GET** `/api/items/:id` - Retrieve a single item by ID
- **PUT** `/api/items/:id` - Update an item by ID
- **DELETE** `/api/items/:id` - Delete an item by ID

## Detailed API Documentation

### Create Item

**Endpoint:** `POST /api/items`

**Request Body:**

```json
{
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 999.99
}
```

**Validation Rules:**

- `name`: Required, string, 1-100 characters
- `description`: Required, string, 1-500 characters
- `price`: Required, number, must be greater than 0

**Success Response (201):**

```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 999.99,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (409) - Duplicate Name:**

```json
{
  "success": false,
  "message": "Item name already exists.",
  "data": null
}
```

### Get All Items

**Endpoint:** `GET /api/items`

**Query Parameters (Optional):**

- `search` or `name` - Search items by name (case-insensitive, partial match)

**Examples:**

```
GET /api/items
GET /api/items?search=laptop
GET /api/items?name=lap
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Items retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 999.99,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Get Item by ID

**Endpoint:** `GET /api/items/:id`

**Success Response (200):**

```json
{
  "success": true,
  "message": "Item retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "Item not found",
  "data": null
}
```

### Update Item

**Endpoint:** `PUT /api/items/:id`

**Request Body (all fields optional, but at least one required):**

```json
{
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 1099.99
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Updated Laptop",
    "description": "Updated description",
    "price": 1099.99,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Error Response (409) - Duplicate Name:**

```json
{
  "success": false,
  "message": "Item name already exists",
  "data": null
}
```

### Delete Item

**Endpoint:** `DELETE /api/items/:id`

**Success Response (200):**

```json
{
  "success": true,
  "message": "Item deleted successfully",
  "data": null
}
```

### Health Check

**Endpoint:** `GET /health`

**Success Response (200):**

```json
{
  "status": "UP",
  "dbStatus": "Connected",
  "uptime": "120s"
}
```

**Error Response (503):**

```json
{
  "status": "DOWN",
  "dbStatus": "Error",
  "uptime": "5s"
}
```

## Error Handling

All errors return a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

### Error Types

1. **Validation Errors (400)** - Invalid input data

   ```json
   {
     "success": false,
     "message": "Validation Error: price: Price must be greater than 0",
     "data": null
   }
   ```

2. **Not Found (404)** - Item not found

   ```json
   {
     "success": false,
     "message": "Item not found",
     "data": null
   }
   ```

3. **Conflict (409)** - Duplicate item name

   ```json
   {
     "success": false,
     "message": "Item name already exists.",
     "data": null
   }
   ```

4. **Invalid ID (400)** - Invalid MongoDB ObjectId format

   ```json
   {
     "success": false,
     "message": "Invalid item ID format",
     "data": null
   }
   ```

5. **Server Error (500)** - Internal server error
   ```json
   {
     "success": false,
     "message": "Internal Server Error",
     "data": null
   }
   ```

## Project Structure

```
task/
├── src/
│   ├── config/
│   │   ├── config.js              # MongoDB connection configuration
│   │   └── swagger.js             # Swagger/OpenAPI configuration
│   ├── controllers/
│   │   └── item.controller.js     # HTTP request/response handling
│   ├── services/
│   │   └── item.service.js        # Business logic layer
│   ├── dto/
│   │   └── item.dto.js            # Data Transfer Objects with Zod validation
│   ├── models/
│   │   └── item.js                 # Item Mongoose model
│   ├── routes/
│   │   └── item.route.js          # API route definitions with Swagger annotations
│   ├── middleware/
│   │   └── errorHandler.js        # Error handling middleware
│   └── server.js                   # Main server file
├── package.json
├── .env                            # Environment variables (create this)
└── README.md
```

## Architecture

The application follows a clean architecture pattern with clear separation of concerns:

### Request Flow

```
Request → Routes → Controller → Service → Model → Database
                ↓
              DTOs (Validation)
                ↓
         Error Handler (if error)
```

### Layer Responsibilities

1. **Routes** (`routes/`) - Define API endpoints and HTTP methods, delegate to controllers
2. **Controllers** (`controllers/`) - Handle HTTP requests/responses, call services
3. **Services** (`services/`) - Business logic (duplicate checks, existence validation)
4. **DTOs** (`dto/`) - Input validation using Zod schemas
5. **Models** (`models/`) - Mongoose schemas for database operations
6. **Config** (`config/`) - Database connection and configuration
7. **Middleware** (`middleware/`) - Error handling and request processing

### Key Design Decisions

- **Validation at DTO Layer**: All input validation happens in DTOs using Zod
- **Business Logic in Services**: Duplicate checks, existence validation in service layer
- **Error Handling Middleware**: Centralized error handling with consistent format
- **Database Connection Management**: Separate config file for MongoDB connection
- **Graceful Shutdown**: Proper cleanup on application termination

## Data Model

### Item Schema

```javascript
{
  name: String (required, 1-100 chars),
  description: String (required, 1-500 chars),
  price: Number (required, > 0),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Environment Variables

| Variable      | Description               | Default                             |
| ------------- | ------------------------- | ----------------------------------- |
| `PORT`        | Server port number        | `3000`                              |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/itemsdb` |
| `NODE_ENV`    | Environment mode          | `development`                       |
