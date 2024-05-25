import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsRoleAllowed, Public } from 'src/auth/auth.guard';
import { UserRole } from 'src/models/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // // TODO: only administrator can cuse this API
  // @Public()
  // @Post()
  // async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
  //   try {
  //     const createdUser = await this.usersService.create(createUserDto);
  //     return createdUser;
  //   } catch (error) {
  //     if (
  //       error instanceof QueryFailedError &&
  //       error.driverError.code === '23505'
  //     ) {
  //       return res.status(HttpStatus.BAD_REQUEST).send({
  //         status: error.driverError.code,
  //         message: error.message,
  //         driverError: error.driverError,
  //       });
  //     }
  //   }
  // }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @IsRoleAllowed([UserRole.Admin])
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':user_id')
  update(
    @Param('user_id') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user_id, updateUserDto);
  }

  @Delete(':user_id')
  remove(@Param('user_id') user_id: string) {
    return this.usersService.remove(user_id);
  }
}
