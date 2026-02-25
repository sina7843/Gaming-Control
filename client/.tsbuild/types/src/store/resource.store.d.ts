export declare const useResourceStore: import("pinia").StoreDefinition<"resource", {
    resources: any[];
    loading: boolean;
}, {}, {
    fetchResources(): Promise<void>;
    updateLiveCost(resource: any): Promise<void>;
}>;
