import { CreateAccountInput } from './dtos/create-account.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<string | undefined> {
    try {
      const exists = await this.userRepository.findOne({ email });
      if (exists) {
        return 'There is a user with that email already';
      }
      await this.userRepository.save(
        this.userRepository.create({ email, password, role }),
      );
    } catch (e) {
      return "couldn't create account";
    }
  }
}
