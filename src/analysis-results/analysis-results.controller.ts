import {Controller, Get} from '@nestjs/common';
import {AnalysisResultsService} from "./analysis-results.service";
import {AnalysisResults} from "./analysis-results.entity";

@Controller('analysis-results')
export class AnalysisResultsController {

  constructor(private analysisResultsService: AnalysisResultsService){}

  @Get()
  index(): Promise<AnalysisResults[]> {
    return this.analysisResultsService.findAll();
  }

}
