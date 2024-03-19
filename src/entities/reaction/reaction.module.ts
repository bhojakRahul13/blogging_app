import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { reactionProviders } from "./reaction.provider";
import { ReactionService } from "./reaction.service";
import { ReactionController } from "./reaction.controller";
@Module({
  imports: [SharedModule],
  providers: [
   ...reactionProviders,
   ReactionService
  ],
  controllers: [ReactionController],
  exports: [ReactionService],
})
export class ReactionModule  {}
