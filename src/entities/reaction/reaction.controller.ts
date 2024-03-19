import { Controller, UseFilters } from "@nestjs/common";
import { AllExceptionsFilter } from "src/shared/exception/HttpExceptionFilter";
import { ReactionService } from "./reaction.service";

@Controller("api/reactions")
@UseFilters(AllExceptionsFilter)
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}
}
