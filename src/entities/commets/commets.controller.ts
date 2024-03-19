import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  Request,
  UseFilters,
  UnauthorizedException,
  Get,
} from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { StaticAuthGuard } from "src/shared/guards/auth.guard";
import { JwtAuthGuard } from "src/shared/guards/jwt.auth";
import { AllExceptionsFilter } from "src/shared/exception/HttpExceptionFilter";
import { BlogPostService } from "./blog.service";
import { CreateBlogPostRequest } from "./dto/blog-post-dto/blog-post-request.dto";
import { CommentsService } from "./commets.service";

@ApiTags("Posts")
@Controller("api/commetns")
@UseFilters(AllExceptionsFilter)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post("/")
  @UseGuards(StaticAuthGuard, JwtAuthGuard)
  @ApiOkResponse()
  @HttpCode(201)
  public async createPost(
    @Body() reqData: CreateBlogPostRequest,
    @Req() request: Request
  ) {
    if (request["user"].role == "regular") {
      throw new UnauthorizedException(
        "Route access by Admin or editor only ! "
      );
    }
    return await this.postService.createPost(reqData, request["user"]);
  }

  
  @Get("/")
  @UseGuards(StaticAuthGuard, JwtAuthGuard)
  @ApiOkResponse()
  @HttpCode(201)
  public async GetAllPost(
    @Body() reqData: CreateBlogPostRequest,
  ) {
    return await this.postService.createPost(reqData, request["user"]);
  }

}
