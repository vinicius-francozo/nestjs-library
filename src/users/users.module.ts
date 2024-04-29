import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserEntity } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { UsersResolver } from "./users.resolvers";

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
