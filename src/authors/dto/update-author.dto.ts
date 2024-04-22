import { PartialType } from "@nestjs/mapped-types";
import { CreateAuthorDto } from "./create-author.dto";
import { ForbiddenValue } from "src/shared/validators/forbidden-validator";
import { Validate } from "class-validator";

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  // @Validate(ForbiddenValue)
  // user_id: number;
}
