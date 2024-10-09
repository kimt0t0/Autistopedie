import { Test, TestingModule } from '@nestjs/testing';
import { DataPageService } from './datapage.service';

describe('DataPageService', () => {
    let service: DataPageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DataPageService],
        }).compile();

        service = module.get<DataPageService>(DataPageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
