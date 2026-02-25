export type DiscountType = "percent" | "fixed" | string;
export interface DiscountItem {
    _id?: string;
    name: string;
    type: DiscountType;
    value: number;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export declare function getDiscounts(): Promise<DiscountItem[]>;
export declare function createDiscount(payload: DiscountItem): Promise<DiscountItem>;
