import { useDashboard } from "../../DashboardContext/useDashBoard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [],
  };
}
