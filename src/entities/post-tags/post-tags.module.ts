import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { PostController, } from "./blog.controller";
import { blogPostProviders } from "./blog.provider";
import { BlogPostService } from "./blog.service";
import { UserService } from "../user/user.service";
import { userProviders } from "../user/user.provider";
@Module({
  imports: [SharedModule],
  providers: [
    UserService,
    BlogPostService,
    ...blogPostProviders,
    ...userProviders,
  ],
  controllers: [PostController],
  exports: [BlogPostService],
})
export class PostModule {}
