import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    createUserDto.password = hashedPassword;
    return (await this.usersRepository.save(createUserDto)).user_id;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(user_id: string) {
    return this.usersRepository.findOne({
      where: {
        user_id,
      },
    });
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
      updateUserDto.password = hashedPassword;
    }
    return this.usersRepository.update({ user_id }, updateUserDto);
  }

  remove(user_id: string) {
    return this.usersRepository.delete({
      user_id,
    });
  }

  async findUserByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: [
        {
          username: Equal(username),
        },
        {
          email_address: Equal(username),
        },
      ],
    });
  }
}
