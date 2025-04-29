import axios from 'axios';

// ساخت axios با interceptor برای رفرش توکن
const api = axios.create({
  baseURL: "https://delta-project.liara.run/api",
});

// Interceptor برای رفرش توکن
api.interceptors.response.use(
  (response) => response, // درخواست‌های موفقیت‌آمیز
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // ارسال درخواست رفرش توکن
        const { data } = await api.post('/api/auth/refresh', {}, { 
          withCredentials: true // مهم که کوکی‌ها ارسال شوند
        });

        // ارسال دوباره درخواست اصلی با توکن جدید
        error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return api(error.config); // ارسال دوباره درخواست
      } catch (err) {
        // در صورت خطا در رفرش توکن (مثلاً توکن منقضی شده باشد)
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
