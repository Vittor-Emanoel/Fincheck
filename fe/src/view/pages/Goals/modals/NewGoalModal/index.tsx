import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Controller } from "react-hook-form";
import { cn } from "../../../../../app/utils/cn";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { useNewGoalModalController } from "./useNewGoalModalController";

interface NewGoalModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewGoalModal({ open, onClose }: NewGoalModalProps) {
  const {
    errors,
    handleSubmit,
    register,
    control,
    isLoading,
    accounts,
  } = useNewGoalModalController(onClose);

  return (
    <Modal
      title="Nova Meta"
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Meta"
            error={errors.name?.message}
            {...register('name')}
          />

          <div>
            <span className="text-gray-600 tracking-[-0.5px] text-xs">Valor Alvo</span>
            <Controller
              control={control}
              name="targetValue"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.targetValue?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>

          <div>
            <span className="text-gray-600 tracking-[-0.5px] text-xs">Valor Atual</span>
            <Controller
              control={control}
              name="currentValue"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.currentValue?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="bankAccountIds"
            render={({ field: { onChange, value } }) => (
              <div>
                <span className="text-gray-600 tracking-[-0.5px] text-xs">Contas vinculadas</span>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <button
                      type="button"
                      className={cn(
                        'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative flex items-center justify-between',
                        errors.bankAccountIds && '!border-red-900',
                      )}
                    >
                      <span className="block truncate">
                        {value.length > 0
                          ? `${value.length} conta(s) selecionada(s)`
                          : 'Selecione as contas'}
                      </span>
                      <ChevronDownIcon className="w-6 h-6 text-gray-800" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content className="w-full">
                    {accounts.map(account => (
                      <DropdownMenu.Item
                        key={account.id}
                        onSelect={() => {
                          const isSelected = value.includes(account.id);
                          const newValue = isSelected
                            ? value.filter((id: string) => id !== account.id)
                            : [...value, account.id];
                          onChange(newValue);
                        }}
                        className="justify-between"
                      >
                        {account.name}
                        {value.includes(account.id) && <CheckIcon className="text-teal-900" />}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>

                {errors.bankAccountIds && (
                  <span className="text-red-900 text-xs mt-2 block">{errors.bankAccountIds.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="deadline"
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                error={errors.deadline?.message}
                onChange={(date) => onChange(date.toISOString())}
                value={value ? new Date(value) : undefined}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
