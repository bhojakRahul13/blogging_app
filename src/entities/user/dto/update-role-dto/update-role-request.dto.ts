import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/shared/enum/role';

export class UpdateUserRoleRequestDTO {
  @ApiProperty()
  @IsEnum(UserRole)
  readonly  role: UserRole

}
