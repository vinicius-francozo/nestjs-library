import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RentsService } from "./rents.service";
import { RentEntity } from "./entities/rent.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Resolver("rents")
export class RentsResolver {
  constructor(private rentsService: RentsService) {}

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  createCheckout(
    @Context("user") user: UserEntity,
    @Args("bookId") bookId: string
  ): Promise<boolean> {
    return this.rentsService.create(+user.id, +bookId);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  confirmPurchase(@Context("user") user: UserEntity) {
    return this.rentsService.confirmPurchase(+user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  returnBook(@Context("user") user: UserEntity, @Args("id") id: string) {
    return this.rentsService.returnBook(+user.id, +id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  removeBook(@Context("user") user: UserEntity, @Args("id") id: string) {
    return this.rentsService.remove(+user.id, +id);
  }

  @Query(() => [RentEntity])
  @UseGuards(AuthGuard)
  listCheckout(@Context("user") user: UserEntity) {
    return this.rentsService.listCheckout(+user.id);
  }

  @Query(() => RentEntity)
  @UseGuards(AuthGuard)
  listRentedOrCheckout(
    @Context("user") user: UserEntity,
    @Args("bookId") bookId: string
  ) {
    return this.rentsService.getOneCheckoutOrRented(+user.id, +bookId);
  }

  @Query(() => [RentEntity])
  @UseGuards(AuthGuard)
  listRents(@Context("user") user: UserEntity) {
    return this.rentsService.listRents(+user.id);
  }
}
