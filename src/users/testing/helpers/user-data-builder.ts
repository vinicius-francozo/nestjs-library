import { faker } from "@faker-js/faker";
import { UserEntity } from "../../../graphQL/users/types/user.type";

type Props = {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  authors?: any;
  books?: any;
  city?: string;
  country?: string;
  favorites?: any;
  id?: string;
  image?: string;
  isAdmin?: boolean;
  neighbourhood?: string;
  number?: string;
  phone?: string;
  rents?: any;
  reviews?: any;
  street?: string;
  surname?: string;
  username?: string;
};

export function UserDataBuilder(props: Props): UserEntity {
  return {
    name: props.name ?? faker.person.firstName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? faker.internet.password(),
    age: props.age ?? faker.number.int(),
    authors: props.authors ?? [],
    books: props.books ?? [],
    city: props.city ?? faker.location.city(),
    country: props.country ?? faker.location.country(),
    favorites: props.favorites ?? [],
    id: props.id ?? (faker.string.uuid() as any),
    image: props.image ?? faker.string.alpha(),
    isAdmin: props.isAdmin ?? false,
    neighbourhood: props.neighbourhood ?? faker.location.secondaryAddress(),
    number: props.number ?? faker.location.secondaryAddress(),
    phone: props.phone ?? faker.phone.number(),
    rents: props.rents ?? [],
    reviews: props.reviews ?? [],
    street: props.street ?? faker.location.street(),
    surname: props.surname ?? faker.person.lastName(),
    username: props.username ?? faker.internet.userName(),
  };
}
