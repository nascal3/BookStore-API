import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { USERS_PATTERN, UserDto } from '@app/contracts';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERN.FIND_ALL)
  findAll(): UserDto[] {
    return this.usersService.findAll();
  }
}
