/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './schemas/user.schema';

@Injectable()
export class userservice {
  deleteById(id: string): user | PromiseLike<user> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(user.name)
    private readonly userModel: Model<user>,
  ) {}

  async findAll(): Promise<user[]> {
    const users = await this.userModel.find();
    return users;
  }

  async create(newUser: user): Promise<user> {
    const createdUser = await this.userModel.create(newUser);
    return createdUser;
  }

  async findById(id: string): Promise<user> {
    const foundUser = await this.userModel.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return foundUser;
  }
  async findByname(name: string): Promise<user> {
    const foundUser = await this.userModel.findOne({name});

    if (!foundUser) {
      return null;
    }

    return foundUser;

  }

  async updateById(id: string, updatedUser: user): Promise<user> {
    const updatedUserResult = await this.userModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
      runValidators: true,
    });

    if (!updatedUserResult) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return updatedUserResult;
  }

  async deleteUserById(userId: string): Promise<user> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return deletedUser;
  }
  
  async updateRewardsById(id: string, rewards: string[]): Promise<user> {
    const existingUser = await this.userModel.findById(id);

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    existingUser.rewards = rewards;
    const updatedUser = await existingUser.save();

    return updatedUser;
  }
 
  async createUser(userData: { name: string }): Promise<user> {
    const newUser = new this.userModel({
      name: userData.name,
      age: 0,
      level: 0,
      progression: 0,
      rewards: [],
    });

    await newUser.save(); // Save the user to the database

    return newUser;
  }
  // async findByName(name: string): Promise<string | null> {
  //   // const user = await this.userModel.findOne({ name }).exec();
  //   return "jj";
  // }
}