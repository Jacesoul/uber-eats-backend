import { Dish } from 'src/restaurants/entities/dish.entity';
import { OrderItem } from './entities/order-item.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async createOrder(
    customer: User,
    { restaurantId, items }: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    const restaurant = await this.restaurantRepository.findOne(restaurantId);
    if (!restaurant) {
      return {
        ok: false,
        error: 'Restaurant not found',
      };
    }
    for (const item of items) {
      const dish = await this.dishRepository.findOne(item.dishId);
      if (!dish) {
        return {
          ok: false,
          error: 'Dish not found',
        };
      }
      console.log(`Dish price : ${dish.price}`);
      for (const itemOption of item.options) {
        const dishOption = dish.options.find(
          (dishOption) => dishOption.name === itemOption.name,
        );
        if (dishOption) {
          if (dishOption.extra) {
            console.log(`$USD + ${dishOption.extra}`);
          } else {
            const dishOptionChoice = dishOption.choices.find(
              (optionChoice) => optionChoice.name === itemOption.choice,
            );
            if (dishOptionChoice) {
              if (dishOptionChoice.extra) {
                console.log(`$USD + ${dishOptionChoice.extra}`);
              }
            }
          }
        }
      }
      // await this.orderItemRepository.save(
      //   this.orderItemRepository.create({
      //     dish,
      //     options: item.options,
      //   }),
      // );
    }
    // const order = await this.orderRepository.save(
    //   this.orderRepository.create({ customer, restaurant }),
    // );
  }
}
