import { defineStore } from "pinia";
import {
  createPricingRule,
  getPricingRules,
  type PricingRule,
} from "@/api/pricing.api";
import { useToastStore } from "@/store/toast.store";

export const usePricingStore = defineStore("pricing", {
  state: () => ({
    items: [] as PricingRule[],
    loading: false,
    creating: false,
  }),

  actions: {
    async fetchAll() {
      const toast = useToastStore();
      this.loading = true;
      try {
        this.items = await getPricingRules();
      } catch (e: any) {
        toast.error(e?.response?.data?.message || "خطا در دریافت تعرفه‌ها");
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async create(rule: PricingRule) {
      const toast = useToastStore();
      this.creating = true;
      try {
        const created = await createPricingRule(rule);
        // اگر سرور آیتم ساخته‌شده را برگرداند
        this.items = [created, ...this.items];
        toast.success("تعرفه با موفقیت ساخته شد");
        return created;
      } catch (e: any) {
        toast.error(e?.response?.data?.message || "خطا در ساخت تعرفه");
        throw e;
      } finally {
        this.creating = false;
      }
    },
  },
});
