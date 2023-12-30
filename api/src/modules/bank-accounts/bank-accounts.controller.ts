import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from "@nestjs/common";
import { ActiveUserId } from "../../shared/decorators/ActiveUserid";
import { CreateBankAccountDto } from "./dto/create-bank-account.dto";
import { UpdateBankAccountDto } from "./dto/update-bank-account.dto";
import { BankAccountsService } from "./services/bank-accounts.service";

@Controller("bank-accounts")
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(
    @Body() createBankAccountDto: CreateBankAccountDto,
    @ActiveUserId() userId: string
  ) {
    return this.bankAccountsService.create(userId, createBankAccountDto);
  }

  @Get()
  findAllByUserId(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @Put(":bankAccountId")
  update(
    @ActiveUserId() userId: string,
    @Param("bankAccountId", ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto
  ) {
    return this.bankAccountsService.update(
      userId,
      bankAccountId,
      updateBankAccountDto
    );
  }

  @Delete(":bankAccountId")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param("bankAccountId", ParseUUIDPipe) bankAccountId: string
  ) {
    return this.bankAccountsService.remove(userId, bankAccountId);
  }
}
