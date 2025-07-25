# Codeflow.md

## Project Overview

This project is a full-stack web application with a Node.js/Express backend and a React frontend. It provides user authentication, item management (CRUD), activity logging, and generic data management. The codebase is structured for clarity and maintainability, with each part of the stack clearly separated.

---

## Backend (Node.js + Express + MongoDB)

### Key Folders & Files
- **config/**: Centralized configuration (env, secrets)
- **models/**: Mongoose schemas for MongoDB collections (User, Item, ActivityLog, Data)
- **controllers/**: Business logic for each feature (auth, items, activity, data)
- **middleware/**: Express middleware for authentication, authorization, and error handling
- **routes/**: Express routers for API endpoints
- **utils/**: Utility functions (logging activity, access checks)
- **index.js**: Main entry point; sets up Express, connects to MongoDB, mounts routes, and handles errors

### Request Flow Example (e.g., Creating an Item)
1. **Frontend** sends a POST request to `/api/items` with item data and JWT token.
2. **Express Route** (`routes/itemRoutes.js`) receives the request and applies authentication middleware.
3. **Middleware** (`authMiddleware.js`) verifies the JWT and attaches user info to the request.
4. **Route Handler** calls the appropriate **controller** (`itemController.js`).
5. **Controller** validates input, creates the item using the **Item model**, and logs the activity using a **utility**.
6. **Model** (`models/item.js`) interacts with MongoDB to save the item.
7. **Controller** sends a response back to the frontend.
8. **Error Handling**: Any errors are passed to the global error handler middleware.

### Authentication & Authorization
- **JWT-based authentication**: Users log in and receive a JWT, which is sent with each request.
- **Registration auto-login**: When a user registers, the backend returns a JWT token so the user is immediately authenticated and redirected to the dashboard.
- **authMiddleware.js**: Protects routes by verifying JWTs.
- **authorizeRole.js**: Restricts certain routes to specific roles (e.g., admin).

### Activity Logging
- **logActivity.js**: Utility function to record user actions (register, login, CRUD) in the ActivityLog collection.
- **ActivityLog model**: Stores logs with user, action, and metadata.

### Data Model Flexibility
- **Data.js**: Allows storing arbitrary documents in the 'demo' collection (for generic data management/testing).

---

## Frontend (React + Material UI)

### Key Folders & Files
- **src/App.js**: Main app component; sets up routing and layout.
- **src/api.js**: Axios instance for API requests, with JWT token handling.
- **src/components/**: Reusable UI components (Navbar, Footer, ItemList, ActivityLog, etc.)
- **src/pages/**: Main pages (Home, Dashboard, Items, NotFound)
- **src/index.js**: Entry point; sets up theme and renders the app

### Request Flow Example (e.g., Registration & Auto-login)
1. **User** fills out the registration form and submits.
2. **Register.js** sends a POST to `/auth/register` (handled by the API utility).
3. **Backend** creates the user and returns a JWT token.
4. **Frontend** stores the token in localStorage, shows a white success message, and redirects the user to the dashboard (auto-login).
5. **On future visits**, the user must log in again to access protected routes.

### Authentication Flow
- **Login/Register**: User submits credentials; receives JWT on success.
- **JWT Storage**: Token is stored in localStorage and attached to all API requests.
- **ProtectedRoute**: Component that restricts access to certain pages unless authenticated.

### Activity Log
- **ActivityLog.js**: Fetches and displays recent user activities from `/api/activity`.
- **Dashboard.js**: Shows a summary of user stats and recent activity.

### Error Handling & Feedback
- **Toast notifications**: Used for user feedback (success, error, etc.).
- **API.js**: Handles 401 errors globally (logs out user if token is invalid).

---

## Feature-by-Feature Code Connections

### 1. User Authentication & Registration
- **Frontend**: Register/Login forms → `/auth/register` or `/auth/login` → stores JWT.
- **Backend**: `authRoutes.js` → `authController.js` → `User` model, password hashing, JWT creation.
- **Registration auto-login**: After registration, the backend returns a JWT token, which the frontend stores and uses to auto-login and redirect the user to the dashboard.

### 2. Item Management (CRUD)
- **Frontend**: Items page, ItemList, ItemForm → `/api/items` endpoints.
- **Backend**: `itemRoutes.js` → `itemController.js` → `Item` model, access control, activity logging.

### 3. Activity Logging
- **Frontend**: ActivityLog component/page → `/api/activity`.
- **Backend**: `activityRoutes.js` → `activityController.js` → `ActivityLog` model.
- **All controllers**: Call `logActivity` utility after key actions.

### 4. Generic Data Management
- **Frontend**: (If used) interacts with `/data` endpoints.
- **Backend**: `dataRoutes.js` → `dataController.js` → `Data` model (flexible schema).

### 5. Error Handling
- **Frontend**: Shows error messages and redirects on auth errors.
- **Backend**: Centralized error handler middleware for consistent API responses.

---

## How Everything Connects

- **Frontend** communicates with the **backend API** using HTTP requests (via Axios).
- **JWT tokens** are used for authentication and are required for all protected routes.
- **Controllers** in the backend handle business logic and interact with **models** (MongoDB collections).
- **Middleware** ensures only authorized users can access certain routes.
- **Utilities** provide reusable logic (e.g., logging, access checks).
- **Activity logs** provide an audit trail of user actions.

---

## Getting Started (for Developers)

1. **Backend**: Install dependencies, set up `.env` with MongoDB URI and JWT secret, then run the server.
2. **Frontend**: Install dependencies and start the React app.
3. **Explore**: Use the app, check the code, and follow the comments for a deeper understanding.

---

**For more details, see comments in each file. This project is designed to be beginner-friendly and easy to extend!**