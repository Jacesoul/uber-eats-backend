import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const error = await this.userService.createAccount(createAccountInput);
      if (error) {
        return {
          ok: false,
          error,
        };
      }
      return {
        ok: true,
      };
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }
}
