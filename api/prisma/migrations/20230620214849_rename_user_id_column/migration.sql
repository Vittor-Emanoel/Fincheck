/*
  Warnings:

  - You are about to drop the column `userId` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "userId",
ADD COLUMN     "user_id" UUID NOT NULL;
