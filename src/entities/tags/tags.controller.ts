import { Controller, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AllExceptionsFilter } from "src/shared/exception/HttpExceptionFilter";

@ApiTags("Tags")
@Controller("api/tags")
@UseFilters(AllExceptionsFilter)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
}
