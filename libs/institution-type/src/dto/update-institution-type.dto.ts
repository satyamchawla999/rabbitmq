import { PartialType } from '@nestjs/mapped-types';
import { CreateInstitutionTypeDto } from './create-institution-type.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInstitutionTypeDto extends PartialType(
  CreateInstitutionTypeDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

}
