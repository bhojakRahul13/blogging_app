import { Inject, Injectable } from "@nestjs/common";
import { Reaction } from "./reaction.entity";

@Injectable()
export class ReactionService {
  constructor(
    @Inject("ReactionRepository")
    private readonly ReactionRepository: typeof Reaction
  ) {}
}
