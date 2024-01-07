/* eslint-disable prettier/prettier */
// activities.controller.ts
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { Activity } from './schemas/activities.schema';
import { CreateActivityDto } from './dto/create-activities'
import { UpdateActivityDto } from './dto/update-activities'

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async getAllActivities(): Promise<Activity[]> {
    return this.activitiesService.findAll();
  }

  @Post()
  async createActivity(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activitiesService.create(createActivityDto);
  }

  @Get(':id')
  async getActivity(@Param('id') id: string): Promise<Activity> {
    return this.activitiesService.findById(id);
  }

  @Put(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    return this.activitiesService.updateById(id, updateActivityDto);
  }

  @Delete(':id')
  async deleteActivity(@Param('id') id: string): Promise<Activity> {
    return this.activitiesService.deleteById(id);
  }
}
