import { ApiProperty } from '@nestjs/swagger';
import { BlogPost } from '../blog.entity';

export class BlogPostDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly author: string;

  @ApiProperty()
  readonly coverImage: string;

  @ApiProperty()
  readonly publicationDate: Date;

  readonly firstCreated: Date;

  readonly lastModified: Date;

  constructor(blog: BlogPost) {
    this.id = blog.id;
    this.title = blog.title;
    this.content = blog.content;
    this.author = blog.author;
    this.coverImage = blog.coverImage;
    this.publicationDate = blog.publicationDate;
    this.lastModified = blog.lastModified;
    this.firstCreated = blog.firstCreated;
  }
}
