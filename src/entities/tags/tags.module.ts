import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { tagsProviders } from "./tags.provider";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

@Module({
  imports: [SharedModule],
  providers: [
    ...tagsProviders,
  ],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsModule {}
