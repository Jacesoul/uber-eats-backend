import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from 'src/orders/entities/order.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class EditOrderInput extends PickType(Order, ['id', 'status']) {}

@ObjectType()
export class EditOrderOutput extends CoreOutput {}
