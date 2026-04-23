export interface CreateProductOptionDto {
  name: string;
  price?: number;
  cost?: number;
  trackStock?: boolean;
  quantity?: number;
  productId: string;
  isDefault?: boolean;
}
