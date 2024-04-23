import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { BooksModule } from "./books/books.module";
import { CategoriesModule } from "./categories/categories.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { RentsModule } from "./rents/rents.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AuthorsModule } from "./authors/authors.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserEntity } from "./users/entities/user.entity";
import { AuthorEntity } from "./authors/entities/author.entity";
import { BookEntity } from "./books/entities/book.entity";
import { CategoryEntity } from "./categories/entities/category.entity";
import { FavoriteEntity } from "./favorites/entities/favorite.entity";
import { RentEntity } from "./rents/entities/rent.entity";
import { ReviewEntity } from "./reviews/entities/review.entity";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    BooksModule,
    CategoriesModule,
    FavoritesModule,
    RentsModule,
    ReviewsModule,
    AuthorsModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserEntity,
        AuthorEntity,
        BookEntity,
        CategoryEntity,
        FavoriteEntity,
        RentEntity,
        ReviewEntity,
      ],
      synchronize: true,
    }),
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
