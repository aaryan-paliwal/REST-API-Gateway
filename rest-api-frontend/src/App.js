import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import ActivityLog from "./components/ActivityLog";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Items from "./pages/Items";
import GlobalFab from "./components/GlobalFab";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline />
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #181818 0%, #232323 100%)", display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/activity" element={<ProtectedRoute><ActivityLog /></ProtectedRoute>} />
            <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <GlobalFab />
        <Footer />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
}

export default App;
