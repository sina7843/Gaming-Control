import { defineStore } from "pinia";
import { getKpi } from "../api/report.api";

export const useReportStore = defineStore("report", {
  state: () => ({
    kpi: null as any,
    loading: false,
  }),

  actions: {
    async fetchKpi(startDate: string, endDate: string) {
      this.loading = true;
      this.kpi = await getKpi(startDate, endDate);
      this.loading = false;
    },
  },
});
