import axios from "./axios";

export type DiscountType = "percent" | "fixed" | string;

export interface DiscountItem {
  _id?: string;
  name: string;
  type: DiscountType;
  value: number; // درصد یا مبلغ
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function getDiscounts() {
  const { data } = await axios.get("/discount");
  return data as DiscountItem[];
}

export async function createDiscount(payload: DiscountItem) {
  const { data } = await axios.post("/discount", payload);
  return data as DiscountItem;
}
