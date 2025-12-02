import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { goalsService } from "../../../../../app/services/goalsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	targetValue: z.string().nonempty("Valor alvo é obrigatório"),
	currentValue: z.string().nonempty("Valor atual é obrigatório"),
	deadline: z.string().optional(),
	bankAccountIds: z
		.array(z.string())
		.nonempty("Selecione pelo menos uma conta"),
});

type FormData = z.infer<typeof schema>;

export function useNewGoalModalController() {
	const queryClient = useQueryClient();

	const { isNewGoalModalOpen, closeNewGoalModal } = useDashboard();

	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
		control,
		watch,
		setValue,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			currentValue: "0",
			bankAccountIds: [],
		},
	});

	const { bankAccountIds } = watch();

	const { accounts } = useBankAccounts();

	const overallBalanceOfSelectedBankAccounts = useMemo(() => {
		if (!bankAccountIds?.length) return 0;

		return accounts
			.filter((ac) => bankAccountIds.includes(ac.id))
			.reduce((acc, value) => acc + value.currentBalance, 0);
	}, [accounts, bankAccountIds]);

	useEffect(() => {
		setValue("currentValue", String(overallBalanceOfSelectedBankAccounts));
	}, [overallBalanceOfSelectedBankAccounts, setValue]);

	const { isPending: isLoading, mutateAsync } = useMutation({
		mutationFn: goalsService.create,
	});

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
			await mutateAsync({
				...data,
				targetValue: currencyStringToNumber(data.targetValue),
				currentValue: currencyStringToNumber(data.currentValue),
				deadline: data.deadline
					? new Date(data.deadline).toISOString()
					: undefined,
			});

			queryClient.invalidateQueries({ queryKey: ["goals"] });
			toast.success("Meta criada com sucesso!");
			closeNewGoalModal();
			reset();
		} catch {
			toast.error("Erro ao criar meta!");
		}
	});

	return {
		register,
		errors,
		control,
		handleSubmit,
		isLoading,
		accounts,
		isNewGoalModalOpen,
		closeNewGoalModal,
	};
}
