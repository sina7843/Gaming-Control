import { defineStore } from "pinia";
import { loginApi } from "../api/auth.api";
import jwtDecode from "jwt-decode";

interface UserPayload {
  userId: string;
  role: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null as UserPayload | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
  },

  actions: {
    async login(username: string, password: string) {
      const result = await loginApi(username, password);

      this.token = result.token;
      localStorage.setItem("token", result.token);

      this.user = jwtDecode(result.token);
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },

    initialize() {
      if (this.token) {
        this.user = jwtDecode(this.token);
      }
    },
  },
});
