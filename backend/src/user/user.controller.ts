/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { userservice } from './user.service';
import { CreateuserDto } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { user } from './schemas/user.schema';

@Controller('user')
export class userController {
  constructor(private userService: userservice) {}

  @Get()
  async getAllBooks(): Promise<user[]> {
    return this.userService.findAll();
  }

  @Post()
  async createBook(
    @Body()
    user: CreateuserDto,
  ): Promise<user> {
    return this.userService.create(user);
  }

  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<user> {
    return this.userService.findById(id);
  }
  @Get('name/:name')
  async getidbyname(
    @Param('name')
    name: string,
  ): Promise<user> {
    return this.userService.findByname(name);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    user: UpdateUser,
  ): Promise<user> {
    return this.userService.updateById(id, user);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<user> {
    return this.userService.deleteById(id);
  }
  @Put(':id/:action')
  async updateRewards(@Param('id') id: string, @Param('action') action: string): Promise<user> {
    const currentUser = await this.userService.findById(id);

    currentUser.rewards.push(action);

    const updatedUser = await this.userService.updateRewardsById(id, currentUser.rewards);

    return updatedUser;
  }
  


}