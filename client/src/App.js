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
import { Box } from "@mui/material";

// Main App component: Sets up the layout and routing for the frontend
function App() {
  return (
    <>
      {/* CssBaseline provides a consistent baseline for Material UI styling */}
      <CssBaseline />
      {/* Main container with background and layout styling */}
      <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #181818 0%, #232323 100%)", display: 'flex', flexDirection: 'column' }}>
        {/* Navigation bar at the top */}
        <Navbar />
        {/* Main content area with routing */}
        <Box sx={{ flex: 1 }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected routes (require authentication) */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/activity" element={<ProtectedRoute><ActivityLog /></ProtectedRoute>} />
            <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
            {/* Catch-all route for 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        {/* Floating action button (e.g., for quick actions) */}
        <GlobalFab />
        {/* Footer at the bottom */}
        <Footer />
        {/* Toast notifications for user feedback */}
        <ToastContainer position="top-right" autoClose={2000} />
      </Box>
    </>
  );
}

export default App;
