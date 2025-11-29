-- CreateEnum
CREATE TYPE "bank_account_permission" AS ENUM ('VIEW', 'EDIT');

-- CreateTable
CREATE TABLE "bank_account_shares" (
    "id" UUID NOT NULL,
    "bank_account_id" UUID NOT NULL,
    "user_id" UUID,
    "email" TEXT NOT NULL,
    "permission" "bank_account_permission" NOT NULL,

    CONSTRAINT "bank_account_shares_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bank_account_shares" ADD CONSTRAINT "bank_account_shares_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_account_shares" ADD CONSTRAINT "bank_account_shares_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
