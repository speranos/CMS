import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Course {
  @Prop({ unique: true })
  title: String;

  @Prop({ required: true })
  description: String;

  @Prop({ required: true })
  instructor: String;

  @Prop({ required: true })
  schedule: String;
}

export const CourseSchema = SchemaFactory.createForClass(Course);