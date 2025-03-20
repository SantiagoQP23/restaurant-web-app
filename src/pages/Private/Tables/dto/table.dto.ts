export interface CreateTableDto {
  name: string;
  description: string;
  chairs: number;
}

export interface UpdateTableDto extends Partial<CreateTableDto> {
  id: string;
  isActive?: boolean;
  isAvailable?: boolean;
}
