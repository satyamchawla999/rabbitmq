import {
    Controller,
    Get,
    Res,
    Post,
    Body,
    Param,
    Delete,
    ValidationPipe,
    HttpException,
    HttpStatus,
    NotFoundException,
    Put,
  } from '@nestjs/common';
  import { InstitutionTypeService, CreateInstitutionTypeDto, InstitutionType } from '@app/institution-type';
  import { isValidObjectId } from 'mongoose';
  import { Response } from 'express';
  import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiTags,
    ApiInternalServerErrorResponse,
  } from '@nestjs/swagger/dist';
  import { AllError } from '../entities/error';
  
  // ------
  @ApiTags('types')
  // ------
  @Controller('/types')
  export class InstitutionTypeController {
    constructor(
      private readonly institutionTypeService: InstitutionTypeService,
    ) {}
  
    // create api
    @ApiCreatedResponse({
      description: 'Institute-type Created Successfully!',
      type: InstitutionType,
    })
    @ApiBadRequestResponse({
      description: 'Bad Request',
      type: AllError,
    })
    @ApiInternalServerErrorResponse({
      description: 'Invalid request body',
      type: AllError,
    })
    @Post()
    async create(
      @Res() response: Response,
      @Body(new ValidationPipe({ transform: true }))
      createInstitutionType: CreateInstitutionTypeDto,
    ) {
      const institutionTypeData = await this.institutionTypeService.create(
        createInstitutionType,
      );
  
      if (!institutionTypeData) {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
  
      return response.status(HttpStatus.CREATED).json({
        message: 'Institute-type Created Successfully!',
        institutionTypeData,
      });
    }
  
    //  find all
    @ApiNotFoundResponse({
      description: 'No institution-type found',
      type: AllError,
    })
    @ApiOkResponse({
      description: 'Successfully fetched Institution-type data',
      type: InstitutionType,
    })
    @Get()
    async findAll(@Res() response: Response) {
      const institutionTypesData = await this.institutionTypeService.findAll();
      if (!institutionTypesData || institutionTypesData.length == 0) {
        throw new NotFoundException('No institution-type found');
      }
      return response.status(HttpStatus.OK).json({
        message: 'Institution-type data fetched Successfully',
        institutionTypesData,
      });
    }
  
    // find institution-type by id
    @ApiBadRequestResponse({
      description: 'Invalid institute-type ID',
    })
    @ApiNotFoundResponse({
      description: 'No institute-type found',
      type: AllError,
    })
    @ApiOkResponse({
      description: 'Institution-type fetched successfully',
      type: InstitutionType,
    })
    @Get(':id')
    async findOne(
      @Res() response: Response,
      @Param('id', new ValidationPipe({ transform: true })) id: string,
    ) {
      if (!isValidObjectId(id)) {
        throw new HttpException(
          'Invalid institute-type ID',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const institutionTypeData = await this.institutionTypeService.findOne(id);
  
      if (!institutionTypeData) {
        throw new NotFoundException('No institute-type found');
      }
  
      return response.status(HttpStatus.OK).json({
        message: 'Institution-type fetched successfully',
        institutionTypeData,
      });
    }
  
    // update
    @ApiOkResponse({
      description: 'Institute-type updated successfully',
      type: InstitutionType,
    })
    @ApiNotFoundResponse({
      description: 'No institute-type found',
      type: AllError,
    })
    @ApiBadRequestResponse({
      description: 'Invalid institute-type id',
      type: AllError,
    })
    @Put(':id')
    async update(
      @Res() response: Response,
      @Param('id', new ValidationPipe({ transform: true })) id: string,
      @Body(new ValidationPipe({ transform: true }))
      updateInstitutionType: CreateInstitutionTypeDto,
    ) {
  
      if (!isValidObjectId(id)) {
        throw new HttpException('Invalid institute ID', HttpStatus.BAD_REQUEST);
      }
  
      const institutionTypeData = await this.institutionTypeService.update(
        updateInstitutionType,id
      );
  
      if (!institutionTypeData) {
        throw new NotFoundException('No institute-type found');
      }
  
      return response.status(HttpStatus.OK).json({
        message: 'Institute-type updated successfully',
        institutionTypeData,
      });
    }
  
    // delete
    @ApiNotFoundResponse({
      description: 'Institution-type not found',
    })
    @ApiBadRequestResponse({
      description: 'Invalid institute-type ID',
    })
    @ApiOkResponse({
      description: 'Institution-type Deleted Successfully!',
    })
    @Delete(':id')
    async remove(
      @Res() response: Response,
      @Param('id', new ValidationPipe({ transform: true })) id: string,
    ) {
      if (!isValidObjectId(id)) {
        throw new HttpException(
          'Invalid institute-type ID',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const instituteData = await this.institutionTypeService.remove(id);
  
      if (!instituteData || instituteData.modifiedCount === 0) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'Institution-type not found',
        });
      }
  
      return response.status(HttpStatus.OK).json({
        message: 'Institution-type Deleted Successfully!',
      });
    }
  }