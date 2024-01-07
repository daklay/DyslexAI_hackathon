/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'activities',
})
export class Activity {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  chapterId: string;
  
  @Prop({ required: true })
    age: number;

  @Prop({
    type: [
      {
        id: { type: Number, required: true },
        time: { type: Number, required: true },
        tries: { type: Number, required: true },
        hints: { type: Number, required: true },
      },
    ],
    required: true,
  })
  answers: Array<{
    id: number;
    time: number;
    tries: number;
    hints: number;
  }>;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
