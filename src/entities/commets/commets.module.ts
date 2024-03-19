import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { commentsProviders } from "./commets.provider";
import { CommentsService } from "./commets.service";
import { CommentsController } from "./commets.controller";

@Module({
  imports: [SharedModule],
  providers: [
    CommentsService,
    ...commentsProviders,
  ],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentModule {}
