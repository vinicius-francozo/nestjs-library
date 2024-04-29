import { faker } from "@faker-js/faker";
import { CreateBookDto } from "../../../graphQL/books/inputs/create-book.input";

type Props = {
  author_id?: number;
  category_id?: number;
  cover?: string;
  edition?: string;
  pages?: number;
  publisher?: string;
  release_date?: string;
  sinopsis?: string;
  title?: string;
};

export function BookDataBuilder(props: Props): CreateBookDto {
  return {
    author_id: props.author_id ?? faker.number.int(),
    category_id: props.category_id ?? faker.number.int(),
    cover: props.cover ?? (faker.string.alpha() as any),
    edition: props.edition ?? faker.string.alpha(),
    pages: props.pages ?? faker.number.int(),
    publisher: props.publisher ?? faker.string.alpha(),
    release_date: props.release_date ?? faker.string.alpha(),
    sinopsis: props.sinopsis ?? faker.string.alpha(),
    title: props.title ?? faker.string.alpha(),
  };
}
