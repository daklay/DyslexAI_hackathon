import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userController } from './user.controller';
import { userservice } from './user.service';
import { userschema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userschema }])],
  controllers: [userController],
  providers: [userservice],
})
export class userModel {}
