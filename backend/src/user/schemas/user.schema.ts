import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'user',
})
export class user {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ default: 0 })
  level: number;

  @Prop({ default: 0 })
  progression: number;
  @Prop()
  rewards: string[];
}

export const userschema = SchemaFactory.createForClass(user);
