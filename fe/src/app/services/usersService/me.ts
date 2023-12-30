import { UserData } from "../../entities/User";
import { httpClient } from "../httpClient";

export async function me() {
  const { data } = await httpClient.get<UserData>("/users/me");

  return data;
}
