import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true, // This is crucial for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Simplified API calls - no need to include base URL again as it's in axios config
export const getUser = () => api.get("/auth/user");
export const logout = () => api.post("/auth/logout");

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error.response || error);
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
