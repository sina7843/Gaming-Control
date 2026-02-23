import { computed } from "vue";
import { useAuthStore } from "../store/auth.store";

export function usePermissions() {
  const auth = useAuthStore();

  const isAdmin = computed(() => auth.user?.role === "admin");
  const isStaff = computed(() => auth.user?.role === "staff");

  const canManagePricing = computed(() => isAdmin.value);
  const canManageDiscount = computed(() => isAdmin.value);
  const canManageResources = computed(() => isAdmin.value);
  const canViewReports = computed(() => isAdmin.value);

  return {
    isAdmin,
    isStaff,
    canManagePricing,
    canManageDiscount,
    canManageResources,
    canViewReports,
  };
}
