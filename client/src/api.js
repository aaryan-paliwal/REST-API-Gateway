import axios from "axios";

// Get the backend URL from the environment variable.
// In development, it will be 'http://localhost:3000' (or your local backend port).
// In production (Vercel), it will be the URL you set in REACT_APP_BACKEND_URL.
let BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
// Ensure BACKEND_URL does not end with a slash
if (BACKEND_URL.endsWith("/")) BACKEND_URL = BACKEND_URL.slice(0, -1);
BACKEND_URL = BACKEND_URL + "/api";

// Create an Axios instance with the dynamic base URL for API requests
const API = axios.create({
  baseURL: BACKEND_URL,
});

// Request interceptor: Attach JWT token from localStorage to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: Handle 401 Unauthorized errors globally
API.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    // Check if the error response exists and has a status
    if (error.response && error.response.status === 401) {
      // If unauthorized, remove token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login"; // Use window.location.href for full page reload/redirect
    }
    return Promise.reject(error); // Propagate the error
  }
);

export default API; // Export the configured Axios instance 