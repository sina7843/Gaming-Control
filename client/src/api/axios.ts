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

    if (error.response?.data?.message) {
      toast.show(error.response.data.message, "error");
    } else {
      toast.show("خطای غیرمنتظره رخ داد", "error");
    }

    return Promise.reject(error);
  },
);

export default api;
