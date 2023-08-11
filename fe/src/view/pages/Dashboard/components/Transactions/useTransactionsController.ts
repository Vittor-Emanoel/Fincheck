import { useEffect, useState } from "react";
import { useDashboard } from "../../DashboardContext/useDashBoard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../app/services/transactionsService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionsBeingEdited, setTransactionsBeingEdited] =
    useState<null | Transaction>(null);

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { transactions, isLoading, isInitialLoading, refetch } =
    useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters("bankAccountId")(bankAccountId);
    handleChangeFilters("year")(year);
    setIsFiltersModalOpen(false);
  }

  function HandleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }
  function HandleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenTxModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionsBeingEdited(transaction);
  }

  function handleCloseTxModal() {
    setIsEditModalOpen(false);
    setTransactionsBeingEdited(null);
  }

  return {
    isLoading,
    filters,
    transactions,
    isEditModalOpen,
    isInitialLoading,
    areValuesVisible,
    isFiltersModalOpen,
    transactionsBeingEdited,
    HandleOpenFiltersModal,
    HandleCloseFiltersModal,
    handleChangeFilters,
    handleApplyFilters,
    handleOpenTxModal,
    handleCloseTxModal,
  };
}
