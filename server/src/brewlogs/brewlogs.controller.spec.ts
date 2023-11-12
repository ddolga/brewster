import { Test, TestingModule } from '@nestjs/testing';
import { BrewlogsController } from './brewlogs.controller';
import { BrewlogsService } from './brewlogs.service';

describe('BrewlogsController', () => {
  let controller: BrewlogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrewlogsController],
      providers: [BrewlogsService],
    }).compile();

    controller = module.get<BrewlogsController>(BrewlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
