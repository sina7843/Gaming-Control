import axios from "axios";
import { useToastStore } from "@/store/toast.store";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const toast = useToastStore();

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "خطای غیرمنتظره رخ داد";

    // اگر نمی‌خوای برای بعضی درخواست‌ها toast بخوره، اینجا شرط اضافه می‌کنیم
    toast.error("خطا", message);

    return Promise.reject(error);
  },
);

export default api;
