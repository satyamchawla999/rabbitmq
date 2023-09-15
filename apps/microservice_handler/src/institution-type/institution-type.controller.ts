import {
  NotFoundException,
} from '@nestjs/common';
import { InstitutionTypeService, CreateInstitutionTypeDto } from '@app/institution-type';
import { isValidObjectId } from 'mongoose';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';


export class InstitutionTypeController {
  constructor(
    private readonly institutionTypeService: InstitutionTypeService,
  ) { }

  @MessagePattern('create_institution_type')
  async create(
    @Payload()
    createInstitutionType: CreateInstitutionTypeDto,
  ) {
    const institutionTypeData = await this.institutionTypeService.create(
      createInstitutionType,
    );
    if (!institutionTypeData) {
      throw new RpcException({
        message: 'Internal server error',
        statusCode: 500,
      });
    }
    return {
      message: 'Institute-type Created Successfully!',
      institutionTypeData,
    };
  }

  @MessagePattern('get_Institutions_type')
  async findAll() {
    const institutionTypesData = await this.institutionTypeService.findAll();
    if (!institutionTypesData || institutionTypesData.length == 0) {
      throw new NotFoundException('No institution-type found');
    }
    return {
      message: 'Institution-type data fetched Successfully',
      institutionTypesData,
    };
  }

  @MessagePattern('get_Institution_type__by_id')
  async findOne(@Payload() id: string) {
    if (!isValidObjectId(id)) {
      throw new RpcException({
        message: 'Invalid institute-type ID',
        statusCode: 400,
      });
    }
    const institutionTypeData = await this.institutionTypeService.findOne(id);
    if (!institutionTypeData) {
      throw new RpcException('No institute-type found');
    }
    return {
      message: 'Institution-type fetched successfully',
      institutionTypeData,
    };
  }

  @MessagePattern('update_institution_type')
  async update(
    @Payload()
    data: {
      id: string;
      updateInstitutionType: CreateInstitutionTypeDto;
    },
  ) {
    const { id, updateInstitutionType } = data;
    if (!isValidObjectId(id)) {
      throw new RpcException({
        message: 'Invalid institute ID',
        statusCode: 400,
      });
    }
    const institutionTypeData = await this.institutionTypeService.update(
      updateInstitutionType,
      id,
    );
    if (!institutionTypeData) {
      throw new RpcException('No institute-type found');
    }
    return {
      message: 'Institute-type updated successfully',
      institutionTypeData,
    };
  }

  @MessagePattern('delete_Institution_type')
  async remove(@Payload() id: string) {
    if (!isValidObjectId(id)) {
      throw new RpcException({
        message: 'Invalid institute-type ID',
        statusCode: 400,
      });
    }
    const instituteData = await this.institutionTypeService.remove(id);
    if (!instituteData || instituteData.modifiedCount === 0) {
      throw new RpcException({
        message: 'Institution-type not found',
        statusCode: 404,
      });
    }
    return {
      message: 'Institution-type Deleted Successfully!',
    };
  }
}
