import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantResolver, CategoryResolver } from './restaurants.resolver';
import { Module } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository])],
  providers: [RestaurantService, RestaurantResolver, CategoryResolver],
})
export class RestaurantsModule {}
