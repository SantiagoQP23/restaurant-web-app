
/**
 * @author Steven Rosales
 * @version 1.1 20-03-2025 Add isActive to cash register
 */
export interface UpdateCashRegisterDto {
  id: number;
  finalAmount: number;
  closingNote?: string;
  isActive: boolean;
}
