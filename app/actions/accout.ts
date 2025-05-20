import api from "@/lib/api";

export async function getAccount() {
  const { data } = await api.get("/auth/me");
  return data;
}
