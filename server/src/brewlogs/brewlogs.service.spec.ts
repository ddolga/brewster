import { Test, TestingModule } from '@nestjs/testing';
import { BrewlogsService } from './brewlogs.service';

describe('BrewlogsService', () => {
  let service: BrewlogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrewlogsService],
    }).compile();

    service = module.get<BrewlogsService>(BrewlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
