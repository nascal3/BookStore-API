import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../../../users/src/dto/user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_CLIENT') private usersClient: ClientProxy) {}


  findAll(): Observable<any> {
    return this.usersClient.send('users.findAll', {});
  }
}
