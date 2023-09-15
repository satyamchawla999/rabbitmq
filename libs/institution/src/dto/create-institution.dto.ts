import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateInstitutionDto {
  @ApiProperty({
    description: 'The name of institution',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  // -------

  @ApiProperty({
    description: 'The logo-url of institution',
    required: true,
    // example: 'https://www.dummy-url.co.in',
  })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  // -------

  @ApiProperty({
    description: 'The Type of institution',
    required: true,
    // example: '64e43f834a3f4f9134a835a2',
  })
  @IsNotEmpty()
  @IsMongoId()
  type: string;

  // -------

  @ApiProperty({
    description: 'The Office related to institution',
    // example: 'Office 1',
  })
  @IsNotEmpty()
  @IsString()
  office: string;

  // -------

  @ApiProperty({
    description: 'The tags for institution',
    // example: 'Tag 1, tag 2',
  })
  @IsOptional()
  @IsString()
  instituteTags?: string;

  // -------

  @ApiProperty({
    description: 'The comments for institution',
    // example: 'comments',
  })
  @IsOptional()
  @IsString()
  comments?: string;
}