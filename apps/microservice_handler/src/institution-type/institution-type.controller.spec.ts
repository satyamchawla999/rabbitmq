import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionTypeController } from './institution-type.controller';

describe('InstitutionTypeController', () => {
  let controller: InstitutionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstitutionTypeController],
    }).compile();

    controller = module.get<InstitutionTypeController>(InstitutionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
