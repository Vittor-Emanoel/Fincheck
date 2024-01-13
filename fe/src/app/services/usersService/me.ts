import { httpClient } from "../httpClient";

export async function me() {
  const { data } = await httpClient.get("/users/me");

  return data;
}
