import { Test, TestingModule } from '@nestjs/testing';
import { IllustrationController } from './illustration.controller';
import { IllustrationService } from './illustration.service';

describe('IllustrationController', () => {
    let controller: IllustrationController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [IllustrationController],
            providers: [IllustrationService],
        }).compile();

        controller = module.get<IllustrationController>(IllustrationController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
