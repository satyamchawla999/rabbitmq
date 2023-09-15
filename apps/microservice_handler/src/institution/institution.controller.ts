import { InstitutionService, CreateInstitutionDto } from '@app/institution';
import { isValidObjectId } from 'mongoose';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller()
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}
  
  @MessagePattern('create_institution')
  async create(@Payload() createInstitution: CreateInstitutionDto) {
      const institutionData = await this.institutionService.create(createInstitution);
      if (!institutionData) {
        throw new RpcException({
          message: 'No institutions found',
          statusCode: 404,
        });
      }
      return {
        message: 'Institute Created Successfully!',
        institutionData,
      };
  }
  
  @MessagePattern('get_Institutions') // Updated event pattern
  async findAll() {
    const institutionsData = await this.institutionService.findAll();

    if (!institutionsData.length) {
      throw new RpcException({
        message: 'No institutions found',
        statusCode: 404,
      });
    }
    return {
      message: 'Institutions fetched successfully',
      institutionsData,
      status: 200,
    };
  }
  
  @MessagePattern('get_Institution_by_id')
  async findOne(@Payload() id: string) {
    if (!isValidObjectId(id)) {
      throw new RpcException({
        message: 'Invalid institute ID',
        statusCode: 400,
      });
    }
    const institutionData = await this.institutionService.findOne(id);
    if (!institutionData) {
      throw new RpcException({
        message: 'No institutions found',
        statusCode: 404,
      });
    }
    return {
      message: 'Institution fetched successfully',
      institutionData,
    };
  }

  
  @MessagePattern('update_institution')
  async update(
    @Payload() data: { id: string; updateInstitution: CreateInstitutionDto },
  ) {
    const { id, updateInstitution } = data;
    if (!isValidObjectId(id)) {
      throw new RpcException({
        message: 'Invalid institute ID',
        statusCode: 400,
      });
    }
    const institutionData = await this.institutionService.update(
      updateInstitution,
      id,
    );
    if (!institutionData) {
      throw new RpcException({
        message: 'No institute found',
        statusCode: 404,
      });
    }
    return {
      message: 'Institute updated successfully',
      institutionData,
    };
  }

  @MessagePattern('delete_Institution')
  async remove(@Payload() id: string) {
    if (!isValidObjectId(id)) {
      throw new RpcException({
        message: 'Invalid institute ID',
        statusCode: 400,
      });
    }
    const instituteData = await this.institutionService.remove(id);
    if (!instituteData || instituteData.modifiedCount === 0) {
      throw new RpcException({
        message: 'Institution not found',
        statusCode: 404,
      });
    }
    return {
      message: 'Institution Deleted Successfully!',
    };
  }
}
