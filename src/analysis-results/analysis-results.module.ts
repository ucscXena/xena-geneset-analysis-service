import { Module } from '@nestjs/common';
import { AnalysisResultsService } from './analysis-results.service';
import { AnalysisResultsController } from './analysis-results.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AnalysisResults} from "./analysis-results.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalysisResults]),
  ],
  providers: [AnalysisResultsService],
  controllers: [AnalysisResultsController]
})
export class AnalysisResultsModule {}
