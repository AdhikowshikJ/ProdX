import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Simplified API calls
export const getUser = () => api.get("/auth/user");
export const logout = () => api.post("/auth/logout");

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("Request config:", config);
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
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error.response || error);
    if (error.response?.status === 401) {
      // Consider using a more sophisticated approach for handling 401 errors
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
