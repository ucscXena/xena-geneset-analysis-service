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
    })

    it('Get TPM file', () => {
    })

    it('Do BPA analysis', () => {
    })

  })
})
