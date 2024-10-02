import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ required: true })
  pass: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
