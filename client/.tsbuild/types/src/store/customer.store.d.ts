export declare const useCustomerStore: import("pinia").StoreDefinition<"customer", {
    customers: any[];
    loading: boolean;
}, {}, {
    fetchCustomers(): Promise<void>;
}>;
