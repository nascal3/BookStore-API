import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '@app/contracts/users/user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { USER_CLIENT } from './constants';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_CLIENT) private usersClient: ClientProxy) {}


  findAll(): Observable<any> {
    return this.usersClient.send('users.findAll', {});
  }
}
