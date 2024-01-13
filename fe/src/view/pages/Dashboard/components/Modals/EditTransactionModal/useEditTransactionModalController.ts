import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";

const schema = z.object({
  value: z.union([z.string().nonempty("Informe o valor"), z.number()]),
  name: z.string().nonempty("Informe o nome"),
  categoryId: z.string().nonempty("Informe a categoria"),
  bankAccountId: z.string().nonempty("Informe a categoria"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: updateTransaction } = useMutation(
    transactionsService.update
  );
  const { isLoading: isLoadingDelete, mutateAsync: removeTransaction } =
    useMutation(transactionsService.remove);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success(
        transaction!.type === "EXPENSE"
          ? "Despesa editada com sucesso!"
          : "Receita editada com sucesso!"
      );
      onClose();
    } catch (error) {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao editar a despesa!"
          : "Erro ao editar a receita!"
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categoriesList, transaction]);

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success(
        transaction!.type === "EXPENSE"
          ? "A despesa foi deletada com sucesso!"
          : "A receita foi deletada com sucesso!"
      );
      onClose();
    } catch (error) {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao editar a despesa!"
          : "Erro ao editar a receita!"
      );
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }
  return {
    errors,
    control,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleSubmit,
    register,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}
