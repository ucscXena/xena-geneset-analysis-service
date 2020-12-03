import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {AnalysisResultsService} from "./analysis-results.service";
import {AnalysisResults} from "./analysis-results.entity";

@Controller('analysis-results')
export class AnalysisResultsController {

  constructor(private analysisResultsService: AnalysisResultsService){}

  @Get()
  index(): Promise<AnalysisResults[]> {
    return this.analysisResultsService.findAll();
  }

  @Post('create')
  async create(@Body() analysisResultData: AnalysisResults): Promise<any> {
    return this.analysisResultsService.create(analysisResultData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() analysisResultsData: AnalysisResults): Promise<any> {
    analysisResultsData.id = Number(id);
    console.log('Update #' + analysisResultsData.id)
    return this.analysisResultsService.update(analysisResultsData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.analysisResultsService.delete(id);
  }
}
