import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogPostRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly coverImage?: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly publicationDate: Date;
}
