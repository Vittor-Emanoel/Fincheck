import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './services/bank-accounts.service';
import { ValidateBankAccountAccessService } from './services/validate-bank-account-access.service';
import { ValidateBankAccountOwnershipService } from './services/validate-bank-account-ownership.service';

@Module({
  imports: [EmailModule],
  controllers: [BankAccountsController],
  providers: [
    BankAccountsService,
    ValidateBankAccountOwnershipService,
    ValidateBankAccountAccessService,
  ],
  exports: [ValidateBankAccountOwnershipService, ValidateBankAccountAccessService],
})
export class BankAccountsModule {}
