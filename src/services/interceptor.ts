import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { create } from "zustand";

type AuthStore = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
}));
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  console.log("🔐 Using Zustand accessToken:", accessToken);

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

// ✅ Response Interceptor
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
        console.log("♻️ Trying token refresh...");

        if (!refreshToken) {
          toast.error("ورود شما منقضی شده است.");
          await signOut();
          return Promise.reject(error);
        }

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { token: refreshToken }
        );

        console.log("✅ New token received:", data.accessToken);

        if (data?.accessToken) {
          useAuthStore.getState().setAccessToken(data.accessToken);

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } else {
          toast.error("دسترسی منقضی شده. لطفا دوباره وارد شوید.");
          await signOut({ redirect: false });
          return Promise.reject(error);
        }
      } catch (err) {
        toast.error("اعتبار شما پایان یافته است.");
        await signOut({ redirect: false });
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
