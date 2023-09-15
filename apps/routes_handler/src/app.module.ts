import { Module } from '@nestjs/common';
import { InstitutionModule } from '@app/institution';
import { InstitutionTypeModule } from '@app/institution-type';
import { InstitutionTypeController } from './institution-type/institution-type.controller';
import { InstitutionController } from './institution/institution.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [InstitutionModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/backend'), InstitutionTypeModule],
  controllers: [InstitutionController, InstitutionTypeController],
  providers: [],
})
export class AppModule {}
