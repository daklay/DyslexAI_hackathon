/* eslint-disable prettier/prettier */
// activities.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from './schemas/activities.schema';
import { CreateActivityDto } from './dto/create-activities'
import { UpdateActivityDto } from './dto/update-activities'

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name)
    private readonly activityModel: Model<Activity>,
  ) {}

  async findAll(): Promise<Activity[]> {
    return this.activityModel.find().exec();
  }

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const newActivity = new this.activityModel(createActivityDto);
    return newActivity.save();
  }

  async findById(id: string): Promise<Activity> {
    const foundActivity = await this.activityModel.findById(id).exec();

    if (!foundActivity) {
      throw new NotFoundException('Activity not found.');
    }

    return foundActivity;
  }

  async updateById(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    return this.activityModel.findByIdAndUpdate(id, updateActivityDto, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async deleteById(id: string): Promise<Activity> {
    return this.activityModel.findByIdAndDelete(id).exec();
  }
}
