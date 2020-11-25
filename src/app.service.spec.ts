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
    it('Generate URL', () => {
    })

    it('Get TPM file', () => {
    })

    it('Do analysis', () => {
    })

  })
})
