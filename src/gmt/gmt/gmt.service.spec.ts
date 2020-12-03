import { Test, TestingModule } from '@nestjs/testing';
import { GmtService } from './gmt.service';

describe('GmtService', () => {
  let service: GmtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GmtService],
    }).compile();

    service = module.get<GmtService>(GmtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
