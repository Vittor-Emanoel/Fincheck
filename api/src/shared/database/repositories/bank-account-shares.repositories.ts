import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountSharesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.BankAccountShareCreateArgs) {
    return this.prismaService.bankAccountShare.create(createDto);
  }

  findMany<T extends Prisma.BankAccountShareFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.BankAccountShareFindManyArgs>,
  ) {
    return this.prismaService.bankAccountShare.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.BankAccountShareFindFirstArgs) {
    return this.prismaService.bankAccountShare.findFirst(findFirstDto);
  }

  updateMany(updateManyDto: Prisma.BankAccountShareUpdateManyArgs) {
    return this.prismaService.bankAccountShare.updateMany(updateManyDto);
  }
}
