import { LoginInput } from './login.input';
import { UserInput } from './user.input';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [UserEntity])
  @UseGuards(new AuthGuard)
  me(@Context('user') user: UserEntity) {
    return user;
  }

  @Query(() => [UserEntity])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: UserInput) {
    let user = await this.userService.getUserByEmail(input.email);
    if (user) {
      throw new HttpException('Usuario ya existe', HttpStatus.UNAUTHORIZED);
    }
    user = await this.userService.create(input);
    return this.userService.createToken(user);
  }

  @Query(() => UserEntity)
  async login(@Args('input') input: LoginInput) {
    let user = await this.userService.getUserByEmail(input.email);
    if (!user) {
      throw new HttpException('Usuario no registrado', HttpStatus.UNAUTHORIZED);
    }
    const confirmPassword = await this.userService.comparePassword(input.password, user.password);
    if (!confirmPassword) {
      throw new HttpException('Credenciales invalidos', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.createToken(user);
  }
}
