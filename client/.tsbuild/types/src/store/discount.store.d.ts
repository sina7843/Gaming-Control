import { type DiscountItem } from "@/api/discount.api";
export declare const useDiscountStore: import("pinia").StoreDefinition<"discount", {
    items: DiscountItem[];
    loading: boolean;
    creating: boolean;
}, {}, {
    fetchAll(): Promise<void>;
    create(item: DiscountItem): Promise<DiscountItem>;
}>;
