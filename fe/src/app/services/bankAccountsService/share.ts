import { httpClient } from "../httpClient";

export interface ShareBankAccountParams {
  bankAccountId: string;
  email: string;
  permission: 'VIEW' | 'EDIT';
}

export async function share({ bankAccountId, email, permission }: ShareBankAccountParams) {
  const { data } = await httpClient.post(`/bank-accounts/${bankAccountId}/share`, {
    email,
    permission,
  });

  return data;
}
