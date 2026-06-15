import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

  private users: UserDto[] = [
    {
      id: 1,
      username: 'caleb',
      password: '123',
      age: 25
    },
    {
      id: 2,
      username: 'john',
      password: '123',
      age: 30
    },
  ];

  findAll(): UserDto[] {
    return this.users;
  }

}
