import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from 'src/orders/entities/order.entity';
import { InputType, PickType, ObjectType } from '@nestjs/graphql';

@InputType()
export class TakeOrderInput extends PickType(Order, ['id']) {}

@ObjectType()
export class TakeOrderOutput extends CoreOutput {}
