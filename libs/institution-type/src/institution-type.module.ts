import { Module } from '@nestjs/common';
import { InstitutionTypeService } from './institution-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InstitutionType, InstitutionTypeSchema } from './institutionType.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:InstitutionType.name,schema:InstitutionTypeSchema}])],
  providers: [InstitutionTypeService],
  exports: [InstitutionTypeService],
})
export class InstitutionTypeModule {}
