/*
  Warnings:

  - You are about to drop the column `inital_balance` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `initial_balance` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "inital_balance",
ADD COLUMN     "initial_balance" DOUBLE PRECISION NOT NULL;
