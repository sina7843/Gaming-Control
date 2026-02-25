import { defineStore } from "pinia";
import {
  createDiscount,
  getDiscounts,
  type DiscountItem,
} from "@/api/discount.api";
import { useToastStore } from "@/store/toast.store";

export const useDiscountStore = defineStore("discount", {
  state: () => ({
    items: [] as DiscountItem[],
    loading: false,
    creating: false,
  }),

  actions: {
    async fetchAll() {
      const toast = useToastStore();
      this.loading = true;
      try {
        this.items = await getDiscounts();
      } catch (e: any) {
        toast.error(e?.response?.data?.message || "خطا در دریافت تخفیف‌ها");
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async create(item: DiscountItem) {
      const toast = useToastStore();
      this.creating = true;
      try {
        const created = await createDiscount(item);
        this.items = [created, ...this.items];
        toast.success("تخفیف با موفقیت ساخته شد");
        return created;
      } catch (e: any) {
        toast.error(e?.response?.data?.message || "خطا در ساخت تخفیف");
        throw e;
      } finally {
        this.creating = false;
      }
    },
  },
});
