import axios from "axios";

// Production URLs
export const IMAGE_BASE_URL = "https://star-forum-backend.onrender.com/api";
export const BASE_URL = "https://star-forum-backend.onrender.com/api/admin";
export const server = "https://star-forum-backend.onrender.com/api";

// Development URLs (commented out)
// export const IMAGE_BASE_URL = "http://localhost:5000/api/public";
// export const BASE_URL = "http://localhost:5000/api/admin";
// export const server = "http://localhost:3000"

// Local Network URLs (commented out)
// export const IMAGE_BASE_URL = "http://192.168.1.27:5000/api";
// export const BASE_URL = "http://192.168.1.27:5000/api/admin";
// export const server = "http://192.168.1.27:3000";

export const apiClient = axios.create({
  baseURL: BASE_URL,
//   timeout: 30000,
});

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("userToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("userToken");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
