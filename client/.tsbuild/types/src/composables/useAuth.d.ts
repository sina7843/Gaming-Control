import { type ComputedRef } from "vue";
import { useAuthStore, type UserPayload } from "@/store/auth.store";
type UseAuthReturn = {
    auth: ReturnType<typeof useAuthStore>;
    isAuthenticated: ComputedRef<boolean>;
    user: ComputedRef<UserPayload | null>;
    isAdmin: ComputedRef<boolean>;
    isStaff: ComputedRef<boolean>;
    logout: () => void;
};
export declare function useAuth(): UseAuthReturn;
export {};
