import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add access token to all requests
api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const session = await getSession();
        const refreshToken = session?.refreshToken;

        if (!refreshToken) {
          toast.error("برای ادامه ابتدا وارد شوید ❌");
          return Promise.reject(error);
        }

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );

        if (data?.accessToken) {
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } else {
          toast.error("دسترسی منقضی شده است. دوباره وارد شوید.");
          await signOut();
        }
      } catch (err) {
        toast.error("دسترسی شما منقضی شده است.");
        await signOut();
        return Promise.reject(err);
      }
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      toast.error("برای انجام این عملیات باید وارد شوید ❗");
    }

    return Promise.reject(error);
  }
);

export default api;
