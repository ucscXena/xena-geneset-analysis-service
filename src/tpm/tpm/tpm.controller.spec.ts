import { Test, TestingModule } from '@nestjs/testing';
import { TpmController } from './tpm.controller';

describe('TpmController', () => {
  let controller: TpmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TpmController],
    }).compile();

    controller = module.get<TpmController>(TpmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
