import { CreateProductDto } from './create-product.dto';

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: string;
  //image: string;
  isActive?: boolean;
  isPublic?: boolean;
  iva?: number;
}
