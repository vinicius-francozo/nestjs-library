import { faker } from "@faker-js/faker";
import { ReviewEntity } from "../../entities/review.entity";
import { BookEntity } from "../../../books/entities/book.entity";
import { UserEntity } from "../../../users/entities/user.entity";

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
