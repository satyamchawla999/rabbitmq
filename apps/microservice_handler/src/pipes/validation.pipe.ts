import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    const validationPipe = new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors
        .map((error) => Object.values(error.constraints))
        .flat();
        throw new RpcException({
          statusCode: 400,
          message: errorMessages,
        });
      },
    });
    return validationPipe.transform(value, metadata); 
  }
}