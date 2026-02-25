export type UserRole = "admin" | "staff";
export interface UserPayload {
    userId: string;
    role: UserRole;
}
export declare const useAuthStore: import("pinia").StoreDefinition<"auth", {
    token: string | null;
    user: UserPayload | null;
}, {
    isAuthenticated: (state: {
        token: string | null;
        user: {
            userId: string;
            role: UserRole;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        token: string | null;
        user: UserPayload | null;
    }>) => boolean;
    isAdmin: (state: {
        token: string | null;
        user: {
            userId: string;
            role: UserRole;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        token: string | null;
        user: UserPayload | null;
    }>) => boolean;
}, {
    login(username: string, password: string): Promise<void>;
    logout(): void;
    initialize(): void;
}>;
