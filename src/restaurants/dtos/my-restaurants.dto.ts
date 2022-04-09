import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MyRestaurantsOutput extends CoreOutput {
  @Field((type) => [Restaurant])
  restaurants?: Restaurant[];
}
