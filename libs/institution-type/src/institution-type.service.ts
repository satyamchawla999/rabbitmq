import { Injectable } from '@nestjs/common';
import { CreateInstitutionTypeDto } from './dto/create-institution-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InstitutionType } from './institutionType.schema';

@Injectable()
export class InstitutionTypeService {
  constructor(
    @InjectModel(InstitutionType.name)
    private InstitutionTypeModel: Model<InstitutionType>,
  ) {}

  async create(
    createInstitutionType: CreateInstitutionTypeDto,
  ): Promise<InstitutionType> {
    try {
      const newInstitutionType = new this.InstitutionTypeModel(
        createInstitutionType,
      );
      return newInstitutionType.save();
    } catch (err) {
      throw new Error('Failed to create institution-type');
    }
  }

  findAll(): Promise<InstitutionType[]> {
    return this.InstitutionTypeModel.find({ status: true });
  }

  async findOne(id: string): Promise<InstitutionType | null> {
    return this.InstitutionTypeModel.findOne({ _id: id, status: true }).exec();
  }

  async update(updateInstitutionTypeDto: CreateInstitutionTypeDto, _id:string) {
    try {
      const instituteTypeData: InstitutionType =
        await this.InstitutionTypeModel.findByIdAndUpdate(_id, updateInstitutionTypeDto, {
          new: true,
        });
      return instituteTypeData;
    } catch (err) {
      throw new Error('Failed to update institution-type');
    }
  }

  async remove(id: string) {
    try {
      const instituteData = await this.InstitutionTypeModel.updateOne(
        { _id: id, status: true },
        { $set: { status: false } },
      );

      return instituteData;
    } catch (err) {
      throw new Error('Failed to delete institution-type');
    }
  }
}