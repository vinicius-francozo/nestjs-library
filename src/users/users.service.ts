import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangeImageUserDto } from "./dto/change-image-user.dto";

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  changeImage(id: number, changeImageUserDto: ChangeImageUserDto) {
    return `change image`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}