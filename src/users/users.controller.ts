
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    // The ValidationPipe will automatically validate the incoming body based on the DTO.
    // If the data is invalid, it will throw an exception.
    return this.usersService.create(createUserDto);
  }
}
