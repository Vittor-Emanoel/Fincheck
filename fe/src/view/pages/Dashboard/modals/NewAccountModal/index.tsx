import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    errors,
    handleSubmit,
    register,
    control,
    isLoading,
    isShared,
    setIsShared,
  } = useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo inicial</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente',
                  },
                  {
                    value: 'INVESTMENT',
                    label: 'Investimentos',
                  },
                  {
                    value: 'CASH',
                    label: 'Dinheiro Físico',
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="isShared"
              checked={isShared}
              onChange={(e) => setIsShared(e.target.checked)}
              className="w-4 h-4 text-teal-900 rounded border-gray-300 focus:ring-teal-900"
            />
            <label htmlFor="isShared" className="text-gray-700 text-sm">
              Compartilhar conta?
            </label>
          </div>

          {isShared && (
            <>
              <Input
                type="email"
                placeholder="E-mail do convidado"
                error={errors.shareWithEmail?.message}
                {...register('shareWithEmail')}
              />

              <Controller
                control={control}
                name="permission"
                defaultValue="VIEW"
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Permissão"
                    error={errors.permission?.message}
                    onChange={onChange}
                    value={value}
                    options={[
                      { value: 'VIEW', label: 'Visualizar' },
                      { value: 'EDIT', label: 'Editar' },
                    ]}
                  />
                )}
              />
            </>
          )}
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
