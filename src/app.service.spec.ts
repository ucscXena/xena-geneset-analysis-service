import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import * as fs from 'fs'

describe('AppService', () => {
  let appService: AppService

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile()

    appService = app.get<AppService>(AppService)
    appService.testDB()
  })

  beforeEach(() => {
    appService.testDB()
  })


  describe('Handling analysis', () => {
    it('Check Environment', () => {
      const output = appService.checkAnalysisEnvironment()
      expect(output).toContain('No arguments provided')
    })

    it('Generate URL', () => {
      const output = appService.generateTpmUrlForCohort('TCGA Ovarian Cancer (OV)')
      expect(output).toEqual('https://xenago.xenahubs.net/download/expr_tpm/TCGA-OV_tpm_tab.tsv.gz')
    })

    it('Get TPM data from cohort', () => {
      const output = appService.generateTpmFromCohort('TCGA Ovarian Cancer (OV)')
      expect(output).toEqual('http..')
    })

    it('Get TPM file', () => {
    })

    it('Do BPA analysis', () => {
    })

  })
})
