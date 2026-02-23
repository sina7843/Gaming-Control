import { defineStore } from "pinia";
import api from "../api/axios";

export const useSessionStore = defineStore("session", {
  state: () => ({
    activeSession: null as any,
    drawerOpen: false,
  }),

  actions: {
    async fetchSession(id: string) {
      const { data } = await api.get(`/session/${id}`);
      this.activeSession = data;
    },

    openDrawer(session: any) {
      this.activeSession = session;
      this.drawerOpen = true;
    },

    closeDrawer() {
      this.drawerOpen = false;
      this.activeSession = null;
    },
  },
});
