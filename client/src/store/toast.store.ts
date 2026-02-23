import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [] as {
      id: number;
      message: string;
      type: "success" | "error" | "info";
    }[],
  }),

  actions: {
    show(message: string, type: "success" | "error" | "info" = "info") {
      const id = Date.now();

      this.toasts.push({ id, message, type });

      setTimeout(() => {
        this.remove(id);
      }, 3000);
    },

    remove(id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
  },
});
