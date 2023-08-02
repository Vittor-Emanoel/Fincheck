import { useDashboard } from "../../DashboardContext/useDashBoard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isLoading: false,
  };
}
