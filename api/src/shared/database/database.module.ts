import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountSharesRepository } from './repositories/bank-account-shares.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { TransactionsRepository } from './repositories/transactions.repository';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
    BankAccountSharesRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
    BankAccountSharesRepository,
  ],
})
export class DatabaseModule {}
