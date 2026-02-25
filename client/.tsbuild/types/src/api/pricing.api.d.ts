export type PricingModel = "per_hour" | "per_minute" | "flat" | string;
export interface PricingRule {
    _id?: string;
    name: string;
    model: PricingModel;
    rate: number;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export declare function getPricingRules(): Promise<PricingRule[]>;
export declare function createPricingRule(payload: PricingRule): Promise<PricingRule>;
