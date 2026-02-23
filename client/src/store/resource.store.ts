import { defineStore } from "pinia";
import { getResources } from "../api/resource.api";
import { getLiveCost } from "../api/session.api";

export const useResourceStore = defineStore("resource", {
  state: () => ({
    resources: [] as any[],
    loading: false,
  }),

  actions: {
    async fetchResources() {
      this.loading = true;
      this.resources = await getResources();
      this.loading = false;
    },
    async updateLiveCost(resource: any) {
      if (!resource.activeSessionId) return;

      const result = await getLiveCost(resource.activeSessionId);

      resource.liveCost = result.subtotal;
    },
  },
});
