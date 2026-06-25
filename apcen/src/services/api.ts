import axios, { type AxiosInstance } from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL)
  throw new Error(
    "API_URL was not found. Please check your environment variables!",
  );

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@App:token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest.url !== "auth/login" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const storedRefreshToken = localStorage.getItem("@App:refreshToken");

        if (!storedRefreshToken) throw new Error("No refresh token saved.");

        const response = await axios.post(`${API_URL}auth/refresh`, {
          refreshToken: storedRefreshToken,
        });

        const { accessToken, refreshToken } = response.data;

        localStorage.setItem("@App:token", accessToken);

        if (refreshToken)
          localStorage.setItem("@App:refreshToken", refreshToken);

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        console.warn("Session expired... Redirecting to login screen.");
        localStorage.removeItem("@App:token");
        localStorage.removeItem("@App:refreshToken");
        window.location.href = "/";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
