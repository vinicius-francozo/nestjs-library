import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FileUpload } from "graphql-upload-ts";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Resolver("users")
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => UserEntity)
  createUser(@Args("data") data: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(data);
  }

  @Query(() => UserEntity)
  findOneUser(@Args("id") id: string): Promise<UserEntity> {
    return this.usersService.findOne(+id);
  }

  @Mutation(() => UserEntity)
  @UseGuards(AuthGuard)
  update(
    @Context("user") user: UserEntity,
    @Args("data") updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return this.usersService.update(+user.id, updateUserDto);
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
