import { Test, TestingModule } from '@nestjs/testing';
import { DocVersionService } from './doc-version.service';

describe('DocVersionService', () => {
  let service: DocVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocVersionService],
    }).compile();

    service = module.get<DocVersionService>(DocVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
