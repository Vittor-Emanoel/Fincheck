/*
  Warnings:

  - You are about to drop the column `bank_account_id` on the `goals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_bank_account_id_fkey";

-- AlterTable
ALTER TABLE "goals" DROP COLUMN "bank_account_id";

-- CreateTable
CREATE TABLE "_BankAccountToGoal" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BankAccountToGoal_AB_unique" ON "_BankAccountToGoal"("A", "B");

-- CreateIndex
CREATE INDEX "_BankAccountToGoal_B_index" ON "_BankAccountToGoal"("B");

-- AddForeignKey
ALTER TABLE "_BankAccountToGoal" ADD CONSTRAINT "_BankAccountToGoal_A_fkey" FOREIGN KEY ("A") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BankAccountToGoal" ADD CONSTRAINT "_BankAccountToGoal_B_fkey" FOREIGN KEY ("B") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
