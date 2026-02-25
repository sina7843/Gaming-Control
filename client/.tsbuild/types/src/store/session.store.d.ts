export declare const useSessionStore: import("pinia").StoreDefinition<"session", {
    activeSession: any;
    drawerOpen: boolean;
}, {}, {
    fetchSession(id: string): Promise<void>;
    openDrawer(session: any): void;
    closeDrawer(): void;
}>;
