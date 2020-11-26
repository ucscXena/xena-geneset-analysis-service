import {Injectable} from '@nestjs/common'
import * as fs from 'fs'
import axios from 'axios'
import {execSync} from "child_process"
import * as XENA_SERVER_INFO from './analysis/defaultDatasetForGeneset.json'
import md5 from 'md5'

let memoryDb = { results: [] }

let BPA_ANALYSIS_SCRIPT = 'src/analysis/bpa-analysis.R'
let DEFAULT_PATH = '/tmp/path.json'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!asdf123'
  }

  testDB(): any {
    const defaultDb = [
      {
        method: 'BPA Gene Expression',
        geneset: 'hallmark.gmt',
        result: { value: 'hallmark results' },
      },
      {
        method: 'BPA Gene Expression',
        geneset: 'bpaAll.gmt',
        result: { value: 'bpa all gmt' },
      },
      {
        method: 'Paradigm',
        geneset: 'paradigmIPL.gmt',
        result: { value: 'bpa all gmt' },
      },
    ]
    // return db.defaults({ results: defaultDb }).write()
    memoryDb = { results: defaultDb }
  }

  initDB(): any {
    // Set some defaults (required if your JSON file is empty)
    // return db.defaults({ results: [] }).write()
    memoryDb = { results: [] }
    return memoryDb
  }

  addGeneSetResult(method: string, geneset: string, result: any): any {
    // console.log('adding gene set result', method, geneset, result)
    const existingResult = this.getGeneSetResult(method, geneset)
    if (existingResult.length > 0) {
      return {
        error: `Result with method: ${method} and geneset: ${geneset} already exists.`,
      }
    }
    const resultToAdd = {
      method: method,
      geneset: geneset,
      result: result,
    }
    // db.get('results').push(resultToAdd).write()
    memoryDb['results'].push(resultToAdd)
    return resultToAdd
  }

  updateGeneSetResult(method: string, geneset: string, result: any): any {
    const existingResult = this.getGeneSetResult(method, geneset)
    if (existingResult.length > 0) {
      this.removeGeneSetForAnalysis(method, geneset)
    }
    const found = this.getGeneSetResult(method, geneset).length > 0
    if (found) {
      return {
        error: `Unable to remove geneset ${geneset} for method: ${method}.`,
      }
    }
    return this.addGeneSetResult(method, geneset, result)
  }

  removeGeneSetForAnalysis(method: string, geneset: string) {
    memoryDb['results'] = memoryDb['results'].filter(
      (r) => r.method !== method || r.geneset != geneset,
    )
  }

  getGeneSetResult(method: string, geneset: string): any {
    return memoryDb['results'].filter(
      (r) => r.method == method && r.geneset == geneset,
    )
  }

  getGeneSets() {
    return memoryDb['results'].map((r) => r.geneset)
  }

  getGeneSetsForAnalysis(method: string) {
    return memoryDb['results']
      .filter((r) => r.method == method)
      .map((r) => r.geneset)
  }

  getGeneSet(geneset: string) {
    return memoryDb['results'].filter((r) => r.geneset == geneset)
  }

  loadGeneSetState(path: string): any {
    try {
      const rawData = fs.readFileSync(path)
      memoryDb = JSON.parse(rawData.toString())
      return memoryDb
    } catch (e) {
      console.error(e)
    }
  }

  saveGeneSetState(path: string): any {
    fs.writeFileSync(path, JSON.stringify(memoryDb))
    return memoryDb
  }

  generateTpmUrlForCohort(cohort){
    const selectedCohort = XENA_SERVER_INFO[cohort]
    return `${selectedCohort['gene expression'].host}/download/${selectedCohort['gene expression'].dataset}.gz`
  }

  async generateTpmFromCohort(cohort):Promise<string>{
    const url = this.generateTpmUrlForCohort(cohort)
    const filename = url.substr(url.lastIndexOf('/')+1)
    if(!fs.existsSync(filename)){
      const outputData = await axios.get(url)
      fs.writeFileSync(filename, outputData.toString())
    }
    // const outputData = fs.readFileSync(filename)
    return filename
  }

  async analyze(method: string, cohort: string,genesetName: string, gmtData: any) {

    const tpmFile = await this.generateTpmFromCohort(cohort)
    const gmtPath = this.generateGmtFile(genesetName,gmtData) // TODO: write to file
    const outputFile = this.generateEmptyAnalysisFile(gmtPath,cohort) // TODO: write an output file based on hash of geneset and cohort


    this.checkAnalysisEnvironment()
    if(method==='BPA'){
      this.runBpaAnalysis(gmtPath,tpmFile,outputFile)
    }
    const result = {} // TODO: read outputFile
    // TODO: delete outputFile
    this.addGeneSetResult(method,genesetName,result)
    this.saveGeneSetState(DEFAULT_PATH)

    return result
  }

  checkAnalysisEnvironment() {
    let command = `Rscript ${BPA_ANALYSIS_SCRIPT}`
    try {
      const child = execSync(command)
      return child.toString()
    } catch (e) {
      console.log('error')
      console.log(e)
      return e.message
    }
  }

  runBpaAnalysis(gmtPath: string, tpmFile: string, outputFile: string) {
    let command = `Rscript ${BPA_ANALYSIS_SCRIPT} ${gmtPath} ${tpmFile} ${outputFile} BPA`
    const returnValue = execSync(command)
    console.log('return path',returnValue)
    return outputFile
  }

  generateGmtFile(genesetName: string, gmtData: any):string {
    if(!fs.existsSync(genesetName)){
      fs.writeFileSync(genesetName,gmtData)
    }
    if(!fs.existsSync(genesetName)){
      return undefined
    }
    return genesetName
  }

  generateEmptyAnalysisFile(gmtPath: string, cohort: string):string {
    const gmtData = fs.readFileSync(gmtPath)
    const hash = md5(gmtData)
    const fileName = `output-${cohort.replace(/ /g,'_')}${hash}.tsv`
    if(!fs.existsSync(fileName)){
      fs.writeFileSync(fileName,'')
    }
    if(!fs.existsSync(fileName)){
      return undefined
    }
    return fileName
  }
}
