import api from "./axios";

export async function getCustomers() {
  const { data } = await api.get("/customer");
  return data;
}

export async function createCustomer(payload: any) {
  const { data } = await api.post("/customer", payload);
  return data;
}

export async function updateCustomerTags(id: string, tags: string[]) {
  const { data } = await api.patch(`/customer/${id}/tags`, { tags });
  return data;
}
