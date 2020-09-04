import { LoginInput } from './login.input';
import { UserInput } from './user.input';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  getUserById(_id: string) {
    return this.userRepository.findOne({ _id });
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  createToken({ _id, nombres, apellidos, email, password, celular, direccion }: UserEntity) {
    return jwt.sign({ _id, nombres, apellidos, email, password, celular, direccion }, 'secret');
  }

  async create(input: UserInput): Promise<UserEntity> {
    const user = new UserEntity();
    const hashedPassword = await bcrypt.hash(input.password, 10);

    user._id = uuidv4();
    user.nombres = input.nombres;
    user.apellidos = input.apellidos;
    user.email = input.email;
    user.password = hashedPassword;
    user.celular = input.celular;
    user.direccion = input.direccion;
    return this.userRepository.save(user);
  }
}
