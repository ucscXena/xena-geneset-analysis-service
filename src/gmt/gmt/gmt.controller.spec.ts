import { Test, TestingModule } from '@nestjs/testing';
import { GmtController } from './gmt.controller';

describe('GmtController', () => {
  let controller: GmtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GmtController],
    }).compile();

    controller = module.get<GmtController>(GmtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
