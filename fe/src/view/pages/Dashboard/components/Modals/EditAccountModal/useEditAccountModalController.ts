import { z } from "zod";
import { useDashboard } from "../../../DashboardContext/useDashBoard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["INVESTMENT", "CHECKING", "CASH"]),
  color: z.string().nonempty("Cor é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: updateAccount } = useMutation(
    bankAccountsService.update
  );

  const { isLoading: isLoadingDelete, mutateAsync: removeAccount } =
    useMutation(bankAccountsService.remove);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("A Conta foi editada com sucesso!");
      closeEditAccountModal();
    } catch (error) {
      toast.error("Erro ao salvar as alterações!");
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("A Conta foi deletada com' sucesso!");
      closeEditAccountModal();
    } catch (error) {
      toast.error("Erro ao deletar a conta!");
    }
  }

  return {
    isEditAccountModalOpen,
    errors,
    control,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    register,
    handleSubmit,
    closeEditAccountModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
  };
}
