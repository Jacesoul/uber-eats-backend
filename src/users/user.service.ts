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

  async createAccount({ email, password, role }: CreateAccountInput) {
    try {
      const exists = await this.userRepository.findOne({ email });
      if (exists) {
        // make error
        return;
      }
      await this.userRepository.save(
        this.userRepository.create({ email, password, role }),
      );
      return true;
    } catch (e) {
      // make error
      return;
    }
  }
}
