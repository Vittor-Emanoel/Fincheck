import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GoalsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.GoalCreateArgs) {
    return this.prismaService.goal.create(createDto);
  }

  findMany(findManyDto: Prisma.GoalFindManyArgs) {
    return this.prismaService.goal.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.GoalFindFirstArgs) {
    return this.prismaService.goal.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.GoalUpdateArgs) {
    return this.prismaService.goal.update(updateDto);
  }

  delete(deleteDto: Prisma.GoalDeleteArgs) {
    return this.prismaService.goal.delete(deleteDto);
  }
}
