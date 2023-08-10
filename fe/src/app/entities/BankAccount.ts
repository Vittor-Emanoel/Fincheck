export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: "INVESTMENT" | "CHECKING" | "CASH";
  color: string;
  currentBalance: number;
}
