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

    it('Get TPM file from cohort', async () => {
      const output = await appService.generateTpmFromCohort('TCGA Ovarian Cancer (OV)')
      expect(output).toEqual('TCGA-OV_tpm_tab.tsv.gz')
    },100000)

    it('Generate GMT file', () => {
      // this.gener
    })

  })
})
