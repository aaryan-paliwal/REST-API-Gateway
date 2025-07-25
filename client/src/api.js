import axios from "axios";

// Create an Axios instance with a base URL for API requests
const API = axios.create({
  baseURL: "/api",
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
    if (error.response.status === 401) {
      // If unauthorized, remove token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API; // Export the configured Axios instance 