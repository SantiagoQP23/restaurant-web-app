export interface Plan {
  id: number;
  name: string;
  description: string;
  price: string; // keep string if backend uses DECIMAL
  isActive: boolean;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}
