import { Inject, Injectable } from "@nestjs/common";
import { Tags } from "./tags.entity";

@Injectable()
export class TagsService {
  constructor(
    @Inject("TagsRepository")
    private readonly TagsRepository: typeof Tags
  ) {}
}
