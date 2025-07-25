# FlowOps: REST API Project

A modern, full-stack web application for item management, user authentication, and activity logging. Built with Node.js, Express, MongoDB, and a beautiful React + Material UI frontend.

---

## 📚 Table of Contents
- [Screenshots](#-screenshots)
- [Deployment Link](#-deployment-link)
- [Features](#-features)
- [Project Structure](#️-project-structure)
- [Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [API Overview](#-api-overview)
- [Frontend Highlights](#️-frontend-highlights)
- [Contributing](#-contributing)
- [License](#-license)
- [Credits](#-credits)

---

## 🖼️ Screenshots

> _Add screenshots of your app here!_

```
![Home Page](screenshots/home.png)
![Dashboard](screenshots/dashboard.png)
![Items Page](screenshots/items.png)
```

---

## 🌍 Deployment Link

> _Add your live deployment link here!_

[Live App](https://your-deployment-url.com)

---

## 🚀 Features
- User registration and login (JWT authentication, auto-login after registration)
- Role-based access control (admin & user)
- CRUD operations for items
- Activity logging for all key actions
- Generic data management (flexible schema)
- Responsive, modern UI with Material UI
- Protected routes and error handling

---

## 🗂️ Project Structure

```
rest-api-project/
  ├── config/           # App configuration (env, secrets)
  ├── controllers/      # Business logic for each feature
  ├── middleware/       # Auth, role, and error middleware
  ├── models/           # Mongoose schemas (User, Item, etc.)
  ├── routes/           # Express routers for API endpoints
  ├── utils/            # Utility functions (logging, access)
  ├── client/           # React frontend app
  ├── index.js          # Backend entry point
  └── Codeflow.md       # In-depth codebase & architecture guide
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/rest-api-project.git
cd rest-api-project
```

### 2. Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root with:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   The server runs on [http://localhost:3000](http://localhost:3000)

### 3. Frontend Setup
1. Go to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   The app runs on [http://localhost:3001](http://localhost:3001) and proxies API requests to the backend.

---

## 🌐 API Overview

- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- **Items:** `/api/items` (CRUD, protected)
- **Activity Log:** `/api/activity` (protected)
- **Generic Data:** `/data` (CRUD)

See [Codeflow.md](./Codeflow.md) for detailed architecture and flow.

---

## 🖥️ Frontend Highlights
- Built with React, Material UI, and React Router
- JWT-based authentication (token stored in localStorage)
- Protected routes and role-based UI
- Toast notifications for feedback
- Modern, responsive design

---

## 🧑‍💻 Contributing

1. Fork this repo and clone your fork.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes (add comments, features, or bugfixes!)
4. Commit and push: `git push origin feature/your-feature`
5. Open a Pull Request on GitHub

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

## 🙌 Credits
- Designed & developed by [Aaryan Paliwal](https://www.linkedin.com/in/aaryan-paliwal/)
- See in-file comments and [Codeflow.md](./Codeflow.md) for a beginner-friendly walkthrough!