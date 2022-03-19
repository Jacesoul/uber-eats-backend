import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class DeleteDishInput {
  @Field((type) => Number)
  dishId: number;
}

@ObjectType()
export class DeleteDishOutput extends CoreOutput {}
