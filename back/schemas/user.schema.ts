import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  UserName: string;

  @Prop({ required: true })
  Pass: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
