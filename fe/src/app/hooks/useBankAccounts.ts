import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../services/bankAccountsService";

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountsService.getAll,
  });

  return {
    accounts: data ?? [],
    isFetching,
  };
}
