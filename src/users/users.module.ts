import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserEntity } from "../graphQL/users/types/user.type";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { UsersResolver } from "../graphQL/users/resolver/users.resolvers";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
    CloudinaryModule,
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
