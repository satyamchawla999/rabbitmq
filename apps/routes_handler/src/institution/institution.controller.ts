import { Response } from 'express';
import { isValidObjectId } from 'mongoose';
import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    HttpStatus,
    Res,
    ValidationPipe,
    HttpException,
    NotFoundException,
} from '@nestjs/common';

import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiTags,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger/dist';

import { InstitutionService, CreateInstitutionDto, Institution } from '@app/institution';

import { AllError } from '../entities/error';

// ------
@ApiTags('Institutions')
// ------
@Controller('/institutions')
export class InstitutionController {
    constructor(private readonly institutionService: InstitutionService) { }

    // Post api to create institute and validate request.body data
    @ApiCreatedResponse({
        description: 'Institute Created Successfully!',
        type: Institution,
    })
    @ApiBadRequestResponse({
        description: 'Invalid request body ',
        type: AllError,
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error',
        type: AllError,
    })
    @Post()
    async create(
        @Res() response: Response,
        @Body(new ValidationPipe({ transform: true }))
        createInstitution: CreateInstitutionDto,
    ) {

        if (!createInstitution) {
            throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
        }
        // // create service
        const institutionData = await this.institutionService.create(
            createInstitution,
        );

       

        if (!institutionData) {
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return response.status(HttpStatus.CREATED).json({
            message: 'Institute Created Successfully!',
            institutionData,
        });
    }

    // -----find

    @ApiOkResponse({
        description: 'Institutions fetched successfullyn',
    })
    @ApiNotFoundResponse({
        description: 'No institutions data Found',
    })
    @Get()
    async findAll(@Res() response: Response) {
        const institutionsData = await this.institutionService.findAll();

        if (!institutionsData.length) {
            throw new NotFoundException('No institutions found');
        }

        return response.status(HttpStatus.OK).json({
            message: 'Institutions fetched successfully',
            institutionsData,
        });
    }

    // find by id

    @ApiOkResponse({
        description: 'Institution fetched successfully',
        type: Institution,
    })
    @ApiNotFoundResponse({
        description: 'No institutions data Found',
        type: AllError,
    })
    @ApiBadRequestResponse({
        description: 'Invalid institute ID',
        type: AllError,
    })
    @Get(':id')
    async findOne(
        @Res() response: Response,
        @Param('id', new ValidationPipe({ transform: true })) id: string,
    ) {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid institute ID', HttpStatus.BAD_REQUEST);
        }

        const institutionData = await this.institutionService.findOne(id);

        if (!institutionData) {
            throw new NotFoundException('No institute found');
        }

        return response.status(HttpStatus.OK).json({
            message: 'Institution fetched successfully',
            institutionData,
        });
    }

    // update
    @ApiOkResponse({
        description: 'Institute updated successfully',
        type: Institution,
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: AllError,
    })
    @ApiNotFoundResponse({
        description: 'No institute found with given Id',
        type: AllError,
    })
    @Put(':id')
    async update(
        @Res() response: Response,
        @Param('id', new ValidationPipe({ transform: true })) id: string,
        @Body(new ValidationPipe({ transform: true }))
        updateInstitution: CreateInstitutionDto,
    ) {

        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid institute ID', HttpStatus.BAD_REQUEST);
        }

        const institutionData = await this.institutionService.update(
            updateInstitution, id
        );

        if (!institutionData) {
            throw new NotFoundException('No institute found');
        }

        return response.status(HttpStatus.OK).json({
            message: 'Institute updated successfully',
            institutionData,
        });
    }

    // delete
    @ApiOkResponse({
        description: 'Institution Deleted Successfully!',
    })
    @ApiBadRequestResponse({
        description: 'Invalid institute ID',
        type: AllError,
    })
    @ApiNotFoundResponse({
        description: 'Institution not found',
        type: AllError,
    })
    @Delete(':id')
    async remove(
        @Res() response: Response,
        @Param('id', new ValidationPipe({ transform: true })) id: string,
    ) {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid institute ID', HttpStatus.BAD_REQUEST);
        }
        const instituteData = await this.institutionService.remove(id);

        if (!instituteData || instituteData.modifiedCount === 0) {
            return response.status(HttpStatus.NOT_FOUND).json({
                message: 'Institution not found',
            });
        }
        return response.status(HttpStatus.OK).json({
            message: 'Institution Deleted Successfully!',
        });
    }
}