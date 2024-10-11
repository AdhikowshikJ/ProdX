import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUser = () =>
  api.get(`${import.meta.env.VITE_API_BASE_URL}/auth/user`);
export const logout = () =>
  api.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`); // Changed to POST request

// Add error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
