import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisResultsController } from './analysis-results.controller';

describe('AnalysisResultsController', () => {
  let controller: AnalysisResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalysisResultsController],
    }).compile();

    controller = module.get<AnalysisResultsController>(AnalysisResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
