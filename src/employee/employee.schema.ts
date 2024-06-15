import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  position: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
