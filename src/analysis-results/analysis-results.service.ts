import { Injectable } from '@nestjs/common';
import {UpdateResult, DeleteResult, Repository} from 'typeorm';
import {AnalysisResults} from "./analysis-results.entity";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class AnalysisResultsService {
  constructor(
    @InjectRepository(AnalysisResults)
    private analysisResultsRepository: Repository<AnalysisResults>,
  ) { }

  async  findAll(): Promise<AnalysisResults[]> {
    return await this.analysisResultsRepository.find();
  }

  async  create(analysisResults: AnalysisResults): Promise<AnalysisResults> {
    return await this.analysisResultsRepository.save(analysisResults);
  }

  async update(analysisResults: AnalysisResults): Promise<UpdateResult> {
    return await this.analysisResultsRepository.update(analysisResults.id, analysisResults);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.analysisResultsRepository.delete(id);
  }

}
