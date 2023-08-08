import { useDashboard } from "../../../DashboardContext/useDashBoard";

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModal,
  };
}
