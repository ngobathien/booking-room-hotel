import { Test, TestingModule } from '@nestjs/testing';
import { BookingItemsController } from './booking-items.controller';
import { BookingItemsService } from './booking-items.service';

describe('BookingItemsController', () => {
  let controller: BookingItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingItemsController],
      providers: [BookingItemsService],
    }).compile();

    controller = module.get<BookingItemsController>(BookingItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
