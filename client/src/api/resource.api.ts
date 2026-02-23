import api from "./axios";

export async function getResources() {
  const { data } = await api.get("/resource");
  return data;
}
