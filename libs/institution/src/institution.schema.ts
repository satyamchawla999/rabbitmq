import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { InstitutionType } from '@app/institution-type';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Institution {

  @ApiProperty({ description: 'institution name is required' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'institution url is optional' })
  @Prop({})
  logoUrl: string;

  @ApiProperty({ description: 'institution type must be mongo-object-id' })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'InstitutionType',
    required: true,
  })
  type: InstitutionType;

  @ApiProperty({ description: 'institution office is required' })
  @Prop({ required: true })
  office: string;

  @ApiProperty({ description: 'institution tags is optional' })
  @Prop({})
  instituteTags: string;

  @ApiProperty({ description: 'institution comments is optional' })
  @Prop({})
  comments: string;

  @ApiProperty({ description: 'flags for delete' })
  @Prop({ default: true })
  status: boolean;

  @ApiProperty({ description: 'institution time when created' })
  @Prop({ default: Date.now })
  createdAt: Date;
  
  @ApiProperty({ description: 'institution time when updated' })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type InstitutionDocument = Institution & Document;
export const InstitutionSchema = SchemaFactory.createForClass(Institution);