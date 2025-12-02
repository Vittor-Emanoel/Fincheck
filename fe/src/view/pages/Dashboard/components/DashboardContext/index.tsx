import { createContext, useCallback, useState } from "react";
import { useBankAccounts } from "@/app/hooks/useBankAccounts";
import type { BankAccount } from "../../../../../app/entities/BankAccount";

interface DashboardContextValue {
	areValuesVisible: boolean;
	isNewAccountModalOpen: boolean;
	isNewTransactionModalOpen: boolean;
	newTransactionType: "INCOME" | "EXPENSE" | null;
	toggleValuesVisibility(): void;
	openNewAccountModal(): void;
	closeNewAccountModal(): void;
	openNewTransactionModal(type: "INCOME" | "EXPENSE"): void;
	closeNewTransactionModal(): void;
	isEditAccountModalOpen: boolean;
	isNewGoalModalOpen: boolean;
	accountBeingEdited: null | BankAccount;
	hasBankAccounts: boolean;
	openEditAccountModal(bankAccount: BankAccount): void;
	closeEditAccountModal(): void;
	openNewGoalModal(): void;
	closeNewGoalModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
	const [areValuesVisible, setAreValuesVisible] = useState(true);
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
		useState(false);
	const [newTransactionType, setNewTransactionType] = useState<
		"INCOME" | "EXPENSE" | null
	>(null);
	const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
	const [accountBeingEdited, setAccountBeingEdited] =
		useState<null | BankAccount>(null);
	const { accounts } = useBankAccounts();

	const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);

	const toggleValuesVisibility = useCallback(() => {
		setAreValuesVisible((prevState) => !prevState);
	}, []);

	const openNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(true);
	}, []);

	const closeNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(false);
	}, []);

	const openNewTransactionModal = useCallback((type: "INCOME" | "EXPENSE") => {
		setNewTransactionType(type);
		setIsNewTransactionModalOpen(true);
	}, []);

	const closeNewTransactionModal = useCallback(() => {
		setNewTransactionType(null);
		setIsNewTransactionModalOpen(false);
	}, []);

	const openNewGoalModal = useCallback(() => {
		setIsNewGoalModalOpen(true);
	}, []);

	const closeNewGoalModal = useCallback(() => {
		setIsNewGoalModalOpen(false);
	}, []);

	const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
		setAccountBeingEdited(bankAccount);
		setIsEditAccountModalOpen(true);
	}, []);

	const closeEditAccountModal = useCallback(() => {
		setAccountBeingEdited(null);
		setIsEditAccountModalOpen(false);
	}, []);

	const hasBankAccounts = accounts.length > 0;

	return (
		<DashboardContext.Provider
			value={{
				areValuesVisible,
				toggleValuesVisibility,
				isNewAccountModalOpen,
				openNewAccountModal,
				openNewGoalModal,
				closeNewGoalModal,
				isNewGoalModalOpen,
				closeNewAccountModal,
				isNewTransactionModalOpen,
				openNewTransactionModal,
				closeNewTransactionModal,
				newTransactionType,
				isEditAccountModalOpen,
				accountBeingEdited,
				openEditAccountModal,
				closeEditAccountModal,
				hasBankAccounts,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
}
