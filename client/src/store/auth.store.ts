import { defineStore } from "pinia";
import { loginApi } from "../api/auth.api";
import { jwtDecode } from "jwt-decode";

export type UserRole = "admin" | "staff";

export interface UserPayload {
  userId: string;
  role: UserRole;
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

      this.user = jwtDecode<UserPayload>(result.token);
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },

    initialize() {
      if (this.token) {
        this.user = jwtDecode<UserPayload>(this.token);
      }
    },
  },
});
