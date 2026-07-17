import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "webHeadToken"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

// ==============================
// RESPONSE INTERCEPTOR
// ==============================

api.interceptors.response.use(
  // Successful response
  (response) => response,

  // Error response
  (error) => {
    const status =
      error.response?.status;

    // JWT expired or invalid
    if (status === 401) {
      localStorage.removeItem(
        "webHeadToken"
      );

      localStorage.removeItem(
        "webHeadUser"
      );

      // Avoid redirect loop
      if (
        window.location.pathname !==
        "/login"
      ) {
        window.location.href =
          "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;