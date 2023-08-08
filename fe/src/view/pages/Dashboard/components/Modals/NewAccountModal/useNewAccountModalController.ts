import { useDashboard } from "../../../DashboardContext/useDashBoard";

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
  };
}
