import { useState } from "react";
import { useDashboard } from "../../DashboardContext/useDashBoard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(true);

  function HandleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }
  function HandleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [],
    HandleOpenFiltersModal,
    HandleCloseFiltersModal,
    isFiltersModalOpen,
  };
}
