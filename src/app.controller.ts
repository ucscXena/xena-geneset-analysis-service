import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/geneset/')
  getGeneSets(): any {
    return this.appService.getGeneSets()
  }

  @Get('/geneset/all/:method')
  getGeneSetsForAnalysis(@Param() params): any {
    const method: string = params.method
    return this.appService.getGeneSetsForAnalysis(method)
  }

  @Get('/geneset/:geneset')
  getGeneSet(@Param() params): any {
    return this.appService.getGeneSet(params.geneset)
  }

  @Get('/geneset/:method/:geneset')
  getGeneSetForAnalysis(@Param() params): any {
    return this.appService.getGeneSetResult(params.method, params.geneset)
  }

  @Delete('/geneset/:method/:geneset')
  removeGeneSetForAnalysis(@Param() params): any {
    return this.appService.removeGeneSetForAnalysis(
      params.method,
      params.geneset,
    )
  }

  /**
   * Here, we are going to assume that all of the gmt and tpm data will be coming in directly
   * @param data
   */
  @Post('/analyze')
  analyzeGeneSet(@Body() data: any): any {
    console.log('input data',data)
    const method = data.method // for storing
    const cohort = data.cohort // name of cohort
    const genesetName = data.geneset // name of geneset
    const gmtData = data.gmtData // definition of gene sets by gmt data
    // const tpmData = data.tpmData // tpmData pulled from cohort

    const result = this.appService.analyze(method, cohort, genesetName, gmtData)
    return this.appService.addGeneSetResult(method, genesetName, result)
  }

  @Post('/geneset')
  addGeneSetResult(@Body() data: any): any {
    const geneset = data.geneset
    const method = data.method
    const result = data.result
    return this.appService.addGeneSetResult(method, geneset, result)
  }

  @Put('/geneset/:method/:geneset')
  updateGeneSetResult(@Param() params, @Body() data: any): any {
    const geneset = params.geneset
    const method = params.method
    return this.appService.updateGeneSetResult(method, geneset, data)
  }

  @Post('/loadState/:path')
  loadGeneSetState(@Param() params): any {
    return this.appService.loadGeneSetState(params.path)
  }

  @Post('/saveState/:path')
  saveGeneSetState(@Param() params): any {
    return this.appService.saveGeneSetState(params.path)
  }
}
