import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../../DashboardContext/useDashBoard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useAccountController() {
  const widthWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => total + account.currentBalance,
      0
    );
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    widthWidth,
    toggleValuesVisibility,
    areValuesVisible,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance,
  };
}
