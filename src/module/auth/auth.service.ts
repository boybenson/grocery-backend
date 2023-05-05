import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async login(payload: LoginDto) {
    const user = await this.usersService.getUserByEmail({
      email: payload.email,
    });

    if (!user) throw new NotFoundException('user not found');

    if (user.password !== payload.password)
      throw new UnauthorizedException('incorrect password');

    return user;
  }
}
