import { Module } from "@nestjs/common";
import { RentsService } from "./rents.service";
import { RentsController } from "./rents.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentEntity } from "./entities/rent.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RentEntity])],
  controllers: [RentsController],
  providers: [RentsService],
})
export class RentsModule {}
