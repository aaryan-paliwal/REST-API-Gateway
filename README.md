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

<table width="100%">
  <tr>
    <td align="center" width="50%" style="padding: 10px;">
      <img width="100%" alt="Screenshot 1: User Login Page" src="https://github.com/user-attachments/assets/10b7f4de-e842-474c-bcf1-d3676b3d75b4" style="border-radius: 8px; border: 1px solid #ddd;">
      <p><b>1. User Login Page</b><br>Secure authentication for users.</p>
    </td>
    <td align="center" width="50%" style="padding: 10px;">
      <img width="100%" alt="Screenshot 2: Admin Dashboard" src="https://github.com/user-attachments/assets/01d80ec7-8fce-4bff-9e17-701e057643b1" style="border-radius: 8px; border: 1px solid #ddd;">
      <p><b>2. Admin Dashboard</b><br>Overview and management for administrators.</p>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" style="padding: 10px;">
      <img width="100%" alt="Screenshot 3: Item Listing" src="https://github.com/user-attachments/assets/fbd9a7c7-9023-4147-a24d-ca792522835e" style="border-radius: 8px; border: 1px solid #ddd;">
      <p><b>3. Item Listing (User View)</b><br>Users can manage their specific items.</p>
    </td>
    <td align="center" width="50%" style="padding: 10px;">
      <img width="100%" alt="Screenshot 4: Activity Log" src="https://github.com/user-attachments/assets/3f13f4c7-c00b-439e-a6bd-105566fe7b54" style="border-radius: 8px; border: 1px solid #ddd;">
      <p><b>4. Activity Log (Admin View)</b><br>Detailed logs of all user and admin activities.</p>
    </td>
  </tr>
</table>

---

## 🌍 Deployment Link

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
