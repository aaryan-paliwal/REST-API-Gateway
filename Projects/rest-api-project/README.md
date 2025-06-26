# REST-API-Gateway

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Backend-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB)](https://react.dev/)

## Project Overview

**REST-API-Gateway** is a modern, full-stack web application featuring:
- Secure user authentication (JWT)
- Item management (CRUD)
- Activity logging
- Role-based access control
- Professional, responsive React frontend
- Monochrome, business-inspired UI

## Features
- User registration & login
- Add, view, edit, and delete items
- Activity log for all user actions
- Dashboard with stats and recent activity
- Protected routes and role-based permissions
- Modern UI/UX (Material-UI, Poppins font)

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Material-UI, Axios, React Router

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or cloud)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/aaryan-paliwal/REST-API-Gateway.git
   cd REST-API-Gateway
   ```
2. **Install backend dependencies:**
   ```bash
   npm install
   ```
3. **Install frontend dependencies:**
   ```bash
   cd rest-api-frontend
   npm install
   cd ..
   ```

### Environment Variables
Create a `.env` file in the root with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Running Locally
- **Backend:**
  ```bash
  npm start
  ```
- **Frontend (dev mode):**
  ```bash
  cd rest-api-frontend
  npm start
  ```

### Production Build
- Build the React app:
  ```bash
  cd rest-api-frontend
  npm run build
  ```
- Serve the build from Express (see `index.js` for static file serving).

## Deployment
- Easily deployable on [Render](https://render.com/), Railway, Heroku, or any VPS.
- See `/rest-api-frontend/README.md` for frontend-specific notes.

## License
MIT

---

**Designed & Developed by Aaryan Paliwal** 