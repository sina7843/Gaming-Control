import { computed, type ComputedRef } from "vue";
import { useAuthStore, type UserPayload } from "@/store/auth.store";

type UseAuthReturn = {
  auth: ReturnType<typeof useAuthStore>;
  isAuthenticated: ComputedRef<boolean>;
  user: ComputedRef<UserPayload | null>;
  isAdmin: ComputedRef<boolean>;
  isStaff: ComputedRef<boolean>;
  logout: () => void;
};

export function useAuth(): UseAuthReturn {
  const auth = useAuthStore();

  const isAuthenticated = computed(() => auth.isAuthenticated);
  const user = computed(() => auth.user);

  const isAdmin = computed(() => auth.user?.role === "admin");
  const isStaff = computed(() => auth.user?.role === "staff");

  function logout() {
    auth.logout();
  }

  return { auth, isAuthenticated, user, isAdmin, isStaff, logout };
}
