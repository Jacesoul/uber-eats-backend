import {
  PaginationInput,
  PaginationOutput,
} from './../../common/dtos/pagination.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Category } from '../entities/category.entity';

@InputType()
export class CategoryInput extends PaginationInput {
  @Field((type) => String)
  slug: string;
}

@ObjectType()
export class CategoryOutput extends PaginationOutput {
  @Field((type) => Category, { nullable: true })
  category?: Category;
  @Field((type) => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}
