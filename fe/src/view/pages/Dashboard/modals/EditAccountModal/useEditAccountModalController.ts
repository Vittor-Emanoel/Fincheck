import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { BankAccount } from "../../../../../app/entities/BankAccount";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Saldo inicial é obrigatório'),
    z.number(),
  ]),
  name: z.string().nonempty('Nome da Conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
  shareWithEmail: z
    .string()
    .email('E-mail inválido')
    .optional()
    .or(z.literal('')),
  permission: z.enum(['VIEW', 'EDIT']).optional(),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited,
  } = useDashboard();

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
  const [isShared, setIsShared] = useState(false);

  const queryClient = useQueryClient();
  const {
    isPending: isLoading,
    mutateAsync: updateAccount,
  } = useMutation(
    {
      mutationFn: bankAccountsService.update,
      onMutate: async (updatedAccount) => {
        await queryClient.cancelQueries({ queryKey: ['bankAccounts'] });

        const previousAccounts = queryClient.getQueryData<BankAccount[]>(['bankAccounts']);

        queryClient.setQueryData(['bankAccounts'], (old: BankAccount[] = []) => {
          return old.map(account => {
            if (account.id === updatedAccount.id) {
              return {
                ...account,
                ...updatedAccount,
              };
            }
            return account;
          });
        });

        return { previousAccounts };
      },
      onSuccess: () => {
        closeEditAccountModal();
      },
      onError: (_err, _newAccount, context) => {
        if (context?.previousAccounts) {
          queryClient.setQueryData(['bankAccounts'], context.previousAccounts);
        }
        toast.error("Erro ao editar a conta!");
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      },
    }
  );
  const {
    isPending: isLoadingDelete,
    mutateAsync: removeAccount,
  } = useMutation(
    {
      mutationFn: bankAccountsService.remove,
      onMutate: async (deletedAccountId) => {
        await queryClient.cancelQueries({ queryKey: ['bankAccounts'] });

        const previousAccounts = queryClient.getQueryData<BankAccount[]>(['bankAccounts']);

        queryClient.setQueryData(['bankAccounts'], (old: BankAccount[] = []) => {
          return old.filter(account => account.id !== deletedAccountId);
        });

        return { previousAccounts };
      },
      onSuccess: () => {
        closeEditAccountModal();
      },
      onError: (_err, _newAccount, context) => {
        if (context?.previousAccounts) {
          queryClient.setQueryData(['bankAccounts'], context.previousAccounts);
        }
        toast.error("Erro ao deletar a conta!");
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      },
    }
  );

  const { mutateAsync: shareAccount } = useMutation(
    {
      mutationFn: bankAccountsService.share,
      onSuccess: () => {
        toast.success("A Conta foi compartilhada com sucesso!");
        setIsShared(true);
      },
      onError: () => {
        toast.error("Erro ao compartilhar a conta!");
      },
    }
  );

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      if (data.shareWithEmail && data.permission) {
        await shareAccount({
          bankAccountId: accountBeingEdited!.id,
          email: data.shareWithEmail,
          permission: data.permission,
        });
      }
      toast.success('A conta foi editada com sucesso!');
      closeEditAccountModal();
    } catch {
      toast.error('Erro ao salvar as alterações!');
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
      toast.success('A conta foi deletada com sucesso!');
      closeEditAccountModal();
    } catch {
      toast.error('Erro ao deletar a conta!');
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
    isShared,
    setIsShared,
  };
}
