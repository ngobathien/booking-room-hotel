import { Test, TestingModule } from '@nestjs/testing';
import { RoomAmenitiesController } from './room-amenities.controller';
import { RoomAmenitiesService } from './room-amenities.service';

describe('RoomAmenitiesController', () => {
  let controller: RoomAmenitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomAmenitiesController],
      providers: [RoomAmenitiesService],
    }).compile();

    controller = module.get<RoomAmenitiesController>(RoomAmenitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
