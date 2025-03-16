import { OrderStatus } from '../../../../models';
import { DateFiltePaginationDto } from '../../Common/dto';

export interface FilterOrdersDto extends DateFiltePaginationDto {
  userId?: string;

  status?: OrderStatus;

  isPaid?: boolean;

  tableId?: string;
}
