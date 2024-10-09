import { Test, TestingModule } from '@nestjs/testing';
import { DataPageController } from './datapage.controller';
import { DataPageService } from './datapage.service';

describe('DataPageController', () => {
    let controller: DataPageController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DataPageController],
            providers: [DataPageService],
        }).compile();

        controller = module.get<DataPageController>(DataPageController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
