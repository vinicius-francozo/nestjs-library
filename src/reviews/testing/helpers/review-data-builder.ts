import { faker } from "@faker-js/faker";
import { ReviewEntity } from "../../../graphQL/reviews/types/review.type";
import { BookEntity } from "../../../graphQL/books/types/book.type";
import { UserEntity } from "../../../graphQL/users/types/user.type";

type Props = {
  id?: string;
  rate?: number;
  book?: BookEntity;
  text?: string;
  user?: UserEntity;
};

export function ReviewDataBuilder(props: Props): ReviewEntity {
  return {
    book: props.book ?? new BookEntity(),
    id: props.id ?? (faker.string.uuid() as any),
    rate: props.rate ?? faker.number.int({ min: 0, max: 5 }),
    text: props.text ?? faker.lorem.lines(),
    user: props.user ?? new UserEntity(),
  };
}
