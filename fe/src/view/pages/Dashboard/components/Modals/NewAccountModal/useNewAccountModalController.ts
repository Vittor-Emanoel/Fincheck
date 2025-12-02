import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { bankAccountsService } from "../../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../../DashboardContext/useDashBoard";

const schema = z.object({
  initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["INVESTMENT", "CHECKING", "CASH"]),
  color: z.string().nonempty("Cor é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: "#228BE6",
    },
  });

  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation(
    {
      mutationFn: bankAccountsService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      },
    }
  );

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      toast.success("Conta foi cadastrada com sucesso!");
      closeNewAccountModal();
      reset();
    } catch (error) {
      toast.error("Erro ao cadastrar a conta!");
    }
  });

  return {
    isNewAccountModalOpen,
    errors,
    control,
    isLoading,
    closeNewAccountModal,
    register,
    handleSubmit,
  };
}
