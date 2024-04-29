import { faker } from "@faker-js/faker";
import { CreateAuthorDto } from "../../../graphQL/authors/inputs/create-author.input";

type Props = {
  birth_date?: string;
  country?: string;
  description?: string;
  name?: string;
  surname?: string;
  picture?: string;
};

export function AuthorDataBuilder(props: Props): CreateAuthorDto {
  return {
    birth_date: props.birth_date ?? faker.string.alpha(),
    country: props.country ?? faker.string.alpha(),
    description: props.description ?? faker.string.alpha(),
    name: props.name ?? faker.string.alpha(),
    surname: props.surname ?? faker.string.alpha(),
    picture: props.picture ?? (faker.string.alpha() as any),
  };
}
