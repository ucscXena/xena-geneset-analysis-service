import { Test, TestingModule } from '@nestjs/testing';
import { GmtService } from './gmt.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Gmt} from "../gmt.entity";
import {Repository} from "typeorm";

describe('GmtService', () => {
  let service: GmtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GmtService,{
        provide: getRepositoryToken(Gmt),
        useValue: new Repository<Gmt>(),
      }],
    }).compile();

    service = module.get<GmtService>(GmtService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });


  // it('call method', async () => {
  //   console.log('a',service)
  //   const foundAll = await service.findAll()
  //   console.log('b')
  //   console.log(foundAll)
  //   // // const foundAll = service.findAll()
  //   // try {
  //   //   const p = Promise.resolve(foundAll)
  //   //   p.then((value) => {
  //   //     console.log('value', value)
  //   //   })
  //   // } catch (e) {
  //   //   console.error(e)
  //   //   expect(false).toBeTruthy()
  //   // }
  //
  //   const gmt = new Gmt()
  //   gmt.hash = '2354235'
  //   gmt.name  = 'asdf'
  //   gmt.id = 7
  //   gmt.data = "data and stuff"
  //
  //   const addResult = service.create(gmt)
  //
  //   const deleteResult = service.delete(gmt.id)
  //   // console.log(foundAll)
  //   // const output = await Promise.resolve(foundAll)
  //   // console.log(output)
  //   // expect(foundAll).toEqual({})
  // });
});
