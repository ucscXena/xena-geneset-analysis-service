import { Test, TestingModule } from '@nestjs/testing';
import { GmtController } from './gmt.controller';
import {GmtService} from "./gmt.service";
import {Gmt} from "../gmt.entity";

describe('GmtController', () => {
  let controller: GmtController;
  let service: GmtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GmtService],
      controllers: [GmtController],
    }).compile();

    controller = module.get<GmtController>(GmtController);
    service = module.get<GmtService>(GmtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
