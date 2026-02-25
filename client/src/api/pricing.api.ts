import axios from "./axios";

export type PricingModel = "per_hour" | "per_minute" | "flat" | string;

export interface PricingRule {
  _id?: string;
  name: string;
  model: PricingModel;
  rate: number; // تومان
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function getPricingRules() {
  const { data } = await axios.get("/pricing");
  return data as PricingRule[];
}

export async function createPricingRule(payload: PricingRule) {
  const { data } = await axios.post("/pricing", payload);
  return data as PricingRule;
}
