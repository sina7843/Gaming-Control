import api from "./axios";

export async function startSession(payload: any) {
  const { data } = await api.post("/session", payload);
  return data;
}

export async function updateSeat(sessionId: string, seat: number) {
  const { data } = await api.patch(`/session/${sessionId}/seat`, {
    newSeatCount: seat,
  });
  return data;
}

export async function getLiveCost(sessionId: string) {
  const { data } = await api.get(`/session/${sessionId}/live-cost`);
  return data;
}

export async function finishSession(sessionId: string) {
  const { data } = await api.post(`/session/${sessionId}/finish`);
  return data;
}
