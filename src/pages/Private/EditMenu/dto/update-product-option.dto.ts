import { CreateProductOptionDto } from './create-product-option.dto';

export interface UpdateProductOptionDto
  extends Partial<CreateProductOptionDto> {
  isActive?: boolean;
  isAvailable?: boolean;
}
