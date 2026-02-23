import api from "./axios";

export async function loginApi(username: string, password: string) {
  const { data } = await api.post("/auth/login", {
    username,
    password,
  });

  return data;
}

export async function registerApi(payload: any) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}
