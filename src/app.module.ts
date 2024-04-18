import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RentsModule } from './rents/rents.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [UsersModule, BooksModule, CategoriesModule, FavoritesModule, RentsModule, ReviewsModule, AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
