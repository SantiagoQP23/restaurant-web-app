import { CreateProductionAreaDto } from './create-production-area.dto';

export interface UpdateProductionAreaDto
  extends Partial<CreateProductionAreaDto> {
  isActive?: boolean;
}
