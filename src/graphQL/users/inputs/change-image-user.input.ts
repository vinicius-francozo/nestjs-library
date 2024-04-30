import { IsNotEmpty } from "class-validator";

export class ChangeImageUserInput {
  @IsNotEmpty()
  image: string;
}
