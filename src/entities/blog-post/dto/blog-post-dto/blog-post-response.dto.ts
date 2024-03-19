import { ApiProperty } from '@nestjs/swagger';
import { propsCreatedStatus, propsToken, propsUserLoginResponse } from 'src/shared/constants/swagger/api-property/user';
import { BlogPostDTO } from '../blog.dto';

export class BlogPostResponseDTO {
  @ApiProperty(propsCreatedStatus)
  status: number;

  @ApiProperty()
  data: BlogPostDTO;

  @ApiProperty()
  message: string;

  constructor(status: number, data: BlogPostDTO, message?: string) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
