import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { goalsService } from '../../../../../app/services/goalsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  targetValue: z.string().nonempty('Valor alvo é obrigatório'),
  currentValue: z.string().nonempty('Valor atual é obrigatório'),
  deadline: z.string().optional(),
  bankAccountIds: z.array(z.string()).nonempty('Selecione pelo menos uma conta'),
});

type FormData = z.infer<typeof schema>;

export function useNewGoalModalController(onClose: () => void) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentValue: '0',
      bankAccountIds: [],
    }
  });

  const { accounts } = useBankAccounts();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: goalsService.create
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        targetValue: currencyStringToNumber(data.targetValue),
        currentValue: currencyStringToNumber(data.currentValue),
        deadline: data.deadline ? new Date(data.deadline).toISOString() : undefined,
      });

      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success('Meta criada com sucesso!');
      onClose();
      reset();
    } catch {
      toast.error('Erro ao criar meta!');
    }
  });

  return {
    register,
    errors,
    control,
    handleSubmit,
    isLoading,
    accounts,
  };
}
