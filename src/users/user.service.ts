import { Verification } from './entities/verification.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginInput } from './dtos/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.userRepository.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      const user = await this.userRepository.save(
        this.userRepository.create({ email, password, role }),
      );
      const verification = await this.verificationRepository.save(
        this.verificationRepository.create({ user }),
      );
      this.mailService.sendVerificationEmail(user.email, verification.code);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "couldn't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // check if the password is correct
    // make a JWT and give it to the user
    try {
      const user = await this.userRepository.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return { ok: false, error: 'Wrong password' };
      }
      const token = this.jwtService.sign({ id: user.id });
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Can't log user in.",
      };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.userRepository.findOneOrFail({ id });
      return { ok: true, user };
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.userRepository.findOne(userId);
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verificationRepository.delete({ user: { id: user.id } });
        const verification = await this.verificationRepository.save(
          this.verificationRepository.create({ user }),
        );
        this.mailService.sendVerificationEmail(user.email, verification.code);
      }
      if (password) {
        user.password = password;
      }
      await this.userRepository.save(user);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Could not update profile.' };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verificationRepository.findOne(
        { code },
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        await this.userRepository.save(verification.user);
        await this.verificationRepository.delete(verification.id);
        return { ok: true };
      }
      return { ok: false, error: 'Verification not found' };
    } catch (error) {
      return { ok: false, error: 'Could not verify email' };
    }
  }
}
