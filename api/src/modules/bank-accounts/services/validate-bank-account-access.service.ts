import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { BankAccountPermission } from '@prisma/client';
import { BankAccountSharesRepository } from 'src/shared/database/repositories/bank-account-shares.repositories';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountAccessService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly bankAccountSharesRepo: BankAccountSharesRepository,
  ) {}

  async validate(
    userId: string,
    bankAccountId: string,
    requiredPermission?: BankAccountPermission,
  ) {
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: { id: bankAccountId, userId },
    });

    if (isOwner) return;

    const share = await this.bankAccountSharesRepo.findFirst({
      where: { bankAccountId, userId },
    });

    if (!share) {
      throw new NotFoundException('Bank account not found.');
    }

    if (requiredPermission) {
      if (requiredPermission === 'EDIT' && share.permission !== 'EDIT') {
        throw new ForbiddenException('Insufficient permissions.');
      }
    }
  }
}
