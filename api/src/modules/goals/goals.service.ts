import { Injectable, NotFoundException } from '@nestjs/common';
import { GoalsRepository } from 'src/shared/database/repositories/goals.repositories';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalsService {
  constructor(private readonly goalsRepo: GoalsRepository) {}

  create(userId: string, createGoalDto: CreateGoalDto) {
    const { bankAccountIds, ...data } = createGoalDto;

    return this.goalsRepo.create({
      data: {
        userId,
        ...data,
        bankAccounts: {
          connect: bankAccountIds.map((bankAccountId) => ({ id: bankAccountId })),
        },
      },
    });
  }

  findAll(userId: string) {
    return this.goalsRepo.findMany({
      where: { userId },
      include: {
        bankAccounts: {
          select: {
            id: true,
            name: true,
            color: true,
            type: true,
          }
        }
      }
    });
  }

  findOne(id: string) {
    return this.goalsRepo.findFirst({
      where: { id },
    });
  }

  async update(userId: string, id: string, updateGoalDto: UpdateGoalDto) {
    const isOwner = await this.goalsRepo.findFirst({
      where: { id, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Goal not found');
    }

    const { bankAccountIds, ...data } = updateGoalDto;

    return this.goalsRepo.update({
      where: { id },
      data: {
        ...data,
        bankAccounts: bankAccountIds && {
          set: bankAccountIds.map((bankAccountId) => ({ id: bankAccountId })),
        },
      },
    });
  }

  async remove(userId: string, id: string) {
    const isOwner = await this.goalsRepo.findFirst({
      where: { id, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Goal not found');
    }

    return this.goalsRepo.delete({
      where: { id },
    });
  }
}
