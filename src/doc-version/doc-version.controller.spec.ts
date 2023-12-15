import { Test, TestingModule } from '@nestjs/testing';
import { DocVersionController } from './doc-version.controller';
import { DocVersionService } from './doc-version.service';

describe('DocVersionController', () => {
  let controller: DocVersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocVersionController],
      providers: [DocVersionService],
    }).compile();

    controller = module.get<DocVersionController>(DocVersionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
