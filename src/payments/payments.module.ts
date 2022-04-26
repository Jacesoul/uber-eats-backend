import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { Module } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { PaymentController } from './payment.controller';

@Module({
  controllers: [PaymentController],
  imports: [TypeOrmModule.forFeature([Payment, Restaurant])],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentsModule {}
