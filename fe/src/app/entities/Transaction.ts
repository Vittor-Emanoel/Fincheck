export interface Transaction {
  id: string;
  name: string;
  initialBalance: number;
  type: "INVESTMENT" | "CHECKING" | "CASH";
  color: string;
  currentBalance: number;
}
