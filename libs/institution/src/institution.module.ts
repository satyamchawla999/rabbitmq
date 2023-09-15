import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { Institution, InstitutionSchema } from './institution.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }])],
  providers: [InstitutionService],
  exports: [InstitutionService],
})
export class InstitutionModule {}
