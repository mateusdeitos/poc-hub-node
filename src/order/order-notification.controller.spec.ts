import { Test, TestingModule } from '@nestjs/testing';
import { OrderNotificationController } from './order-notification.controller';

describe('OrderNotificationController', () => {
  let controller: OrderNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderNotificationController],
    }).compile();

    controller = module.get<OrderNotificationController>(OrderNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
