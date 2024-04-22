import { PartialType } from "@nestjs/mapped-types";
import { CreateBookDto } from "./create-book.dto";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from "class-validator";
import { ForbiddenValue } from "src/shared/validators/forbidden-validator";

export class UpdateBookDto extends PartialType(CreateBookDto) {
  // @Validate(ForbiddenValue)
  // userId: number;
}
