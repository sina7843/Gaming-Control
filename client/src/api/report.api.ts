import api from "./axios";

export async function getKpi(startDate: string, endDate: string) {
  const { data } = await api.get("/report/kpi", {
    params: { startDate, endDate },
  });
  return data;
}

export async function getRevenueByResource(startDate: string, endDate: string) {
  const { data } = await api.get("/report/revenue-by-resource", {
    params: { startDate, endDate },
  });
  return data;
}
