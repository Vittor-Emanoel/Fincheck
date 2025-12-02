import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalsService } from './goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@ActiveUserId() userId: string, @Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(userId, createGoalDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.goalsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.goalsService.findOne(id);
  }

  @Patch(':id')
  update(@ActiveUserId() userId: string, @Param('id', ParseUUIDPipe) id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(userId, id, updateGoalDto);
  }

  @Delete(':id')
  remove(@ActiveUserId() userId: string, @Param('id', ParseUUIDPipe) id: string) {
    return this.goalsService.remove(userId, id);
  }
}
