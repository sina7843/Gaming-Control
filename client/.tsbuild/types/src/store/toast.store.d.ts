type ToastType = "success" | "error" | "info";
export interface ToastItem {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    ttlMs: number;
}
export declare const useToastStore: import("pinia").StoreDefinition<"toast", {
    toasts: ToastItem[];
}, {}, {
    push(type: ToastType, title: string, message?: string, ttlMs?: number): string;
    success(title: string, message?: string): string;
    error(title: string, message?: string): string;
    info(title: string, message?: string): string;
    remove(id: string): void;
    clear(): void;
}>;
export {};
