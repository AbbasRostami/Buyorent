import axios from "axios";

const api = axios.create({
  baseURL: "https://delta-project.liara.run/api",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const { data } = await api.post(
          "/api/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(error.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
