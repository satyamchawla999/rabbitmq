import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateInstitutionDto } from './create-institution.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInstitutionDto extends (CreateInstitutionDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
}
