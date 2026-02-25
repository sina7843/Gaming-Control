import { defineStore } from "pinia";

type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  ttlMs: number;
}

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [] as ToastItem[],
  }),

  actions: {
    push(type: ToastType, title: string, message?: string, ttlMs = 3500) {
      const id = uid();
      const item: ToastItem = { id, type, title, message, ttlMs };
      this.toasts = [item, ...this.toasts];

      window.setTimeout(() => this.remove(id), ttlMs);
      return id;
    },

    success(title: string, message?: string) {
      return this.push("success", title, message);
    },
    error(title: string, message?: string) {
      return this.push("error", title, message);
    },
    info(title: string, message?: string) {
      return this.push("info", title, message);
    },

    remove(id: string) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
    clear() {
      this.toasts = [];
    },
  },
});
