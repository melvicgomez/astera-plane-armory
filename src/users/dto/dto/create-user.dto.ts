import { IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/models/user';

export class CreateUserDto {
  first_name: string;
  last_name: string;
  email_address: string;
  username: string;
  password: string;

  @IsString()
  @IsEnum(UserRole)
  role: UserRole;
}
