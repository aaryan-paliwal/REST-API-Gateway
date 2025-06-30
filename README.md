# REST API Project

![Node.js](https://img.shields.io/badge/Backend-Express.js-green?logo=express) ![React](https://img.shields.io/badge/Frontend-React-blue?logo=react) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb) ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

> **A full-stack web application with a Node.js/Express backend and a React frontend. The backend provides a RESTful API for authentication, item management, and activity logging. The frontend offers a modern UI for users to interact with the API.**

---

## 📋 Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🚀 Features
- 🔐 User authentication (register/login)
- 🛡️ Role-based authorization
- 📦 CRUD operations for items
- 📝 Activity logging
- ⚡ Rate limiting & security best practices
- 💻 Responsive React frontend

---

## 🖼️ Screenshots
> _Add your own screenshots here!_

| Login Page | Dashboard |
|------------|-----------|
| ![Login](rest-api-frontend/public/login-screenshot.png) | ![Dashboard](rest-api-frontend/public/dashboard-screenshot.png) |

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Material-UI, Axios
- **Authentication:** JWT
- **Other:** Helmet, Express Rate Limit

---

## 🏁 Getting Started

### Backend Setup
```bash
# In the project root
npm install
# Create a .env file (see .env.example)
npm start
```

### Frontend Setup
```bash
cd rest-api-frontend
npm install
npm start
```

- Backend: [http://localhost:3000](http://localhost:3000)
- Frontend: [http://localhost:3001](http://localhost:3001)

---

## ⚙️ Environment Variables
Create a `.env` file in the root with:
```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## 📚 API Endpoints (Sample)
| Method | Endpoint                | Description           |
|--------|-------------------------|-----------------------|
| POST   | /api/auth/register      | Register user         |
| POST   | /api/auth/login         | Login user            |
| GET    | /api/items              | Get all items         |
| POST   | /api/items              | Create item           |
| PUT    | /api/items/:id          | Update item           |
| DELETE | /api/items/:id          | Delete item           |

---

## 🚢 Deployment
- Deploy backend: [Render](https://render.com/)
- Deploy frontend: [Vercel](https://vercel.com/)
- Update frontend API URL to your deployed backend

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact
- **Author:** Aaryan Paliwal
- **Email:** aapaliwal.work@gmail.com

---