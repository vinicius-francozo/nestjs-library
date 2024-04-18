import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "Forbidden", async: false })
export class ForbiddenValue implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} cannot be updated`;
  }
}
