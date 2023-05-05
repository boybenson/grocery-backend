import {
  BadGatewayException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/constants/schemas';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserByEmailDto } from './dtos/get-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(USER) private userModel: Model<UserDocument>) {}

  getUserByEmail = async (payload: GetUserByEmailDto) => {
    return await this.userModel.findOne({ email: payload.email });
  };

  getUsers() {
    return this.userModel.find({});
  }

  async createUser(payload: CreateUserDto) {
    try {
      const user = await this.getUserByEmail({ email: payload.email });

      if (!user) {
        return await this.userModel.create({ ...payload });
      }

      throw new ConflictException('user already registered');
    } catch (error) {
      throw new BadGatewayException(error?.message);
    }
  }
}
