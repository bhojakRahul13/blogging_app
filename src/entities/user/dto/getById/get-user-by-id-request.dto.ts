import { ApiProperty } from '@nestjs/swagger';
import { customValidator } from 'src/shared/validate/validator';

export class GetUserByIdRequestDTO {
  @ApiProperty()
  @customValidator()
  readonly userId: string;
}
