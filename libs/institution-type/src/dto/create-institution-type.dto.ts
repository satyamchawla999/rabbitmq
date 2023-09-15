import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, Length } from 'class-validator';

export class CreateInstitutionTypeDto {
  
  @ApiProperty({
    description: 'The name of institution-type',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The abbreviation',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message: 'Abbreviation must contain only alphabetic characters',
  })
  @Length(1, 4, {
    message: 'Abbreviation must be between 1 and 4 characters long',
  })
  abbreviation: string;
}
