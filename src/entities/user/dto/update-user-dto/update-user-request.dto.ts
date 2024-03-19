import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  propsUserEmail,
  propsUserName,
  propsUserPassword,

} from 'src/shared/constants/swagger/api-property/user';

export class UpdateUserRequestDTO {
  @ApiPropertyOptional(propsUserName)
  @IsOptional()
  @IsString()
  readonly userName: string;

  @ApiPropertyOptional(propsUserEmail)
  @IsOptional()
  @IsString()
  readonly email: string;

  @ApiPropertyOptional(propsUserPassword)
  @IsOptional()
  @IsString()
  readonly password: string;

}
