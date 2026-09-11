import axios, { isAxiosError, type AxiosInstance } from "axios";
import type { CreateResultPayload } from "@/lib/analysis/types";

const RAW_API_URL = import.meta.env.VITE_API_URL;

if (!RAW_API_URL)
  throw new Error(
    "API_URL was not found. Please check your environment variables!",
  );

export const API_URL = RAW_API_URL.endsWith("/")
  ? RAW_API_URL
  : `${RAW_API_URL}/`;

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const buildImagePreviewUrl = (storageKey: string): string =>
  `${API_URL}image/${encodeURIComponent(storageKey)}/redirect`;

export type SlideQueueImage = {
  id: string;
  blade: string;
  storageKey: string;
  hasConflict: boolean;
  createdAt: string;
};

export type SlideQueuePage = {
  images: SlideQueueImage[];
  page: number;
  totalPages: number;
};

export async function fetchSlideQueue(
  isAdmin: boolean,
  page: number,
  limit: number,
): Promise<SlideQueuePage> {
  if (isAdmin) {
    const { data } = await api.get<SlideQueueImage[]>("/image/conflict");
    return { images: data, page: 1, totalPages: 1 };
  }

  const { data } = await api.get<SlideQueuePage & { limit: number }>(
    `/image/me?page=${page}&limit=${limit}`,
  );

  return {
    images: data.images,
    page: data.page,
    totalPages: data.totalPages,
  };
}

export async function createSlideRecord(
  isAdmin: boolean,
  imageId: string,
  result: CreateResultPayload,
): Promise<string | null> {
  try {
    const { data } = await api.post<{ id: string }>(
      isAdmin ? "/verdict" : "/analysis",
      { imageId, result },
    );
    return data.id;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 409) return null;
    throw error;
  }
}

export async function updateSlideRecord(
  isAdmin: boolean,
  recordId: string,
  result: CreateResultPayload,
): Promise<void> {
  await api.patch(`${isAdmin ? "/verdict" : "/analysis"}/${recordId}`, {
    result,
  });
}

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

        const refreshUrl = new URL("auth/refresh", API_URL).toString();
        const response = await axios.post(
          refreshUrl,
          { refreshToken: storedRefreshToken },
          { timeout: 10000 },
        );

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
