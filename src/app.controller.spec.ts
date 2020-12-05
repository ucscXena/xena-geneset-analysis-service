import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import * as fs from 'fs'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)
    appService.testDB()
  })

  beforeEach(() => {
    appService.testDB()
  })


  describe('Handling database', () => {
    it('Get all gene sets', () => {
      const TEST_GENE_SET = ['hallmark.gmt', 'bpaAll.gmt', 'paradigmIPL.gmt']
      expect(appController.getGeneSets()).toEqual(TEST_GENE_SET)
    })

    it('Get all gene sets for analysis', () => {
      const TEST_GENE_SET = ['hallmark.gmt', 'bpaAll.gmt']
      // let param = new Param()
      const param = {}
      param['method'] = 'BPA Gene Expression'
      expect(appController.getGeneSetsForAnalysis(param)).toEqual(TEST_GENE_SET)
    })

    it('Get one gene set', () => {
      const TEST_GENE_SET = ['hallmark.gmt']
      expect(
        appController
          .getGeneSet({ geneset: 'hallmark.gmt' })
          .map((g) => g.geneset),
      ).toEqual(TEST_GENE_SET)
    })

    it('Add a gene set', () => {
      // const TEST_GENE_SET = ['hallmark.gmt']
      const params = {
        geneset: 'h2.gmt',
        method: 'BPA Gene Expression',
        result: { data: 'data' },
      }
      const result1 = appController.addGeneSetResult(params)
      expect(result1.error).toBeUndefined()
      expect(result1.result.data).toEqual('data')
      expect(appService.getGeneSets().length).toEqual(4)
      const result2 = appController.addGeneSetResult(params)
      expect(result2.error).toBeDefined()
    })

    it('Test removing a geneset ', () => {
      const params = {
        geneset: 'h4.gmt',
        method: 'BPA Gene Expression',
        result: { data: 'data4' },
      }
      const result1 = appController.addGeneSetResult(params)
      expect(result1.error).toBeUndefined()
      expect(result1.result.data).toEqual('data4')
      const result2 = appController.getGeneSet({ geneset: 'h4.gmt' })
      expect(result2.error).toBeUndefined()
      expect(result2[0].geneset).toEqual('h4.gmt')
      expect(result2[0].result.data).toEqual('data4')
      appController.removeGeneSetForAnalysis(params)
      const result3 = appController.getGeneSet({ geneset: 'h4.gmt' })
      expect(result3.length).toEqual(0)
    })

    it('Update a gene set', () => {
      const params = {
        geneset: 'h3.gmt',
        method: 'BPA Gene Expression',
        result: { data: 'data' },
      }
      const params2 = {
        geneset: 'h3.gmt',
        method: 'BPA Gene Expression',
        result: { data: 'data2' },
      }
      const result1 = appController.addGeneSetResult(params)
      expect(result1.error).toBeUndefined()
      expect(result1.result.data).toEqual('data')
      const result2 = appController.updateGeneSetResult(params2, params2.result)
      expect(result2.error).toBeUndefined()
      expect(result2.result.data).toEqual('data2')
    })

    it('Load test ', () => {
      const params = { path: 'test/test-db1.json' }
      appController.loadGeneSetState(params)
      const result2 = appController.getGeneSet({ geneset: 'bpaAlldef.gmt' })
      expect(result2.length).toEqual(1)
      expect(result2[0].result.value).toEqual('bpa all gmt def')
    })

    it('Save test ', () => {
      // assume we are running the test now
      const params2 = {
        geneset: 'h3.gmt',
        method: 'BPA Gene Expression',
        result: { data: 'data2' },
      }
      appController.addGeneSetResult(params2)
      const params = { path: '/tmp/test-dbasdf.json' }
      appController.saveGeneSetState(params)
      const result2 = appController.getGeneSet({ geneset: 'h3.gmt' })
      expect(result2.length).toEqual(1)
      expect(result2[0].result.data).toEqual('data2')
      appController.loadGeneSetState({ path: 'test/test-db1.json' })
      const result3 = appController.getGeneSet({ geneset: 'h3.gmt' })
      expect(result3.length).toEqual(0)
      appController.loadGeneSetState(params)
      const result4 = appController.getGeneSet({ geneset: 'h3.gmt' })
      expect(result4.length).toEqual(1)
      fs.unlinkSync('/tmp/test-dbasdf.json')
    })
  })

  describe('Analysis routes', () => {
    it('Do analysis', () => {
      const params = { path: '/tmp/test-dbasdf.json' }
       appController.analyzeGeneSet(params)
    })
  })
})
