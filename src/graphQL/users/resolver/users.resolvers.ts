import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { UsersService } from "../../../users/users.service";
import { UserEntity } from "../types/user.type";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { FileUpload } from "graphql-upload-ts";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateUserArgs } from "../args/create-user.args";
import { UpdateUserArgs } from "../args/update-user.args";

@Resolver("users")
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => UserEntity)
  createUser(@Args() { data }: CreateUserArgs): Promise<UserEntity> {
    console.log(data);
    return this.usersService.create(data);
  }

  @Query(() => UserEntity)
  findOneUser(@Args("id") id: string): Promise<UserEntity> {
    return this.usersService.findOne(+id);
  }

  @Mutation(() => UserEntity)
  @UseGuards(AuthGuard)
  updateUser(
    @Context("user") user: UserEntity,
    @Args() { data }: UpdateUserArgs
  ): Promise<UserEntity> {
    return this.usersService.update(+user.id, data);
  }

  @Mutation(() => UserEntity)
  @UseGuards(AuthGuard)
  changeImage(
    @Context("user") user: UserEntity,
    @Args({ name: "image", type: () => GraphQLUpload, nullable: true })
    image: FileUpload
  ) {
    return this.usersService.changeImage(+user.id, image);
  }
}
