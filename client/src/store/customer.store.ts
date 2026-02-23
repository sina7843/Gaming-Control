import { defineStore } from "pinia";
import { getCustomers } from "../api/customer.api";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [] as any[],
    loading: false,
  }),

  actions: {
    async fetchCustomers() {
      this.loading = true;
      this.customers = await getCustomers();
      this.loading = false;
    },
  },
});
