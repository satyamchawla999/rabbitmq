import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class InstitutionType {
  @ApiProperty({ description: 'Institution-type name is required' })
  @Prop({ required: true })
  name: string;
  @ApiProperty({ description: 'Institution-type abbrevation is required' })
  @Prop({ required: true })
  abbreviation: string;
  @ApiProperty({ description: 'Institution-type deleted status ' })
  @Prop({ default: true })
  status: boolean;
  @ApiProperty({ description: 'Institution-type date when created ' })
  @Prop({ default: Date.now })
  createdAt: Date;
  @ApiProperty({ description: 'Institution-type date when updated ' })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type InstitutionTypeDocument = InstitutionType & Document;
export const InstitutionTypeSchema =
  SchemaFactory.createForClass(InstitutionType);
