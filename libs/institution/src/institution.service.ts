/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Institution } from './institution.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInstitutionDto } from './dto/create-institution.dto';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectModel(Institution.name)
    private readonly InstitutionModel: Model<Institution>,
  ) {}

  async create(createInstitution: CreateInstitutionDto): Promise<Institution> {
    try {
      const newInstitute = (await this.InstitutionModel.create(createInstitution)).populate('type');
      return newInstitute
    } catch (err) {
      throw new Error('Failed to create institution');
    }
  }

  async findAll(): Promise<Institution[]> {
    return await this.InstitutionModel.find({ status: true }).populate('type');
  }

  async findOne(id: string): Promise<Institution | null> {
    return await this.InstitutionModel.findOne({ _id: id, status: true }).populate('type');
  }

  async update(updateInstitution: CreateInstitutionDto, _id:string) {
    try {
      const instituteData:Institution = await this.InstitutionModel.findByIdAndUpdate(
        _id,
        updateInstitution,
        { new: true },
      ).populate('type');

      return instituteData;
    } catch (err) {
      throw new Error('Failed to update institution');
    }
  }

  async remove(id: string) {
    try {
      const instituteData = await this.InstitutionModel.updateOne(
        { _id: id, status: true },
        { $set: { status: false } },
      );
      return instituteData;
    } catch (err) {
      throw new Error('Failed to delete institution');
    }
  }
}