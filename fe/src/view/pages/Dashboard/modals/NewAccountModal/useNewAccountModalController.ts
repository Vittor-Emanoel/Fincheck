import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
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

export function useNewAccountModalController() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
  } = useDashboard();

  const [isShared, setIsShared] = useState(false);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { isPending: isLoading, mutateAsync } = useMutation(
    {
      mutationFn: bankAccountsService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
        toast.success("Conta foi cadastrada com sucesso!");
        closeNewAccountModal();
        reset();
      },
      onError: () => {
        toast.error("Erro ao cadastrar a conta!");
      },
    }
  );

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        shareWithEmail: data.shareWithEmail || undefined,
        permission: data.permission,
      });

      closeNewAccountModal();
      reset();
    } catch {
      toast.error('Erro ao cadastrar a conta!');
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isShared,
    setIsShared,
  };
}
