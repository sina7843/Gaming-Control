import { type PricingRule } from "@/api/pricing.api";
export declare const usePricingStore: import("pinia").StoreDefinition<"pricing", {
    items: PricingRule[];
    loading: boolean;
    creating: boolean;
}, {}, {
    fetchAll(): Promise<void>;
    create(rule: PricingRule): Promise<PricingRule>;
}>;
