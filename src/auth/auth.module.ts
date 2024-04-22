import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { UserEntity } from "src/users/entities/user.entity";
require("dotenv").config();

@Module({
  imports: [
    JwtModule.register({
      secret: 'zx9b8TaclszHUcUg4JRQm78IgEtF1MqkE_RCux4htBK_dYBnxDb',
    }),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
