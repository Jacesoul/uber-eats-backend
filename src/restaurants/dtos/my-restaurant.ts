import { CoreOutput } from 'src/common/dtos/output.dto';
import { InputType, ObjectType, PickType, Field } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class MyRestaurantInput extends PickType(Restaurant, ['id']) {}

@ObjectType()
export class MyRestaurantOutput extends CoreOutput {
  @Field((type) => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}
