import { Order } from '../../../../models/orders.model';
import { ITable } from '../../../../models/table.model';

export interface SocketResponse {
  ok: boolean;
  msg: string;
}

export interface SocketResponseOrder extends SocketResponse {
  order?: Order;
}

export interface SocketResponseTable extends SocketResponse {
  table?: ITable;
}
