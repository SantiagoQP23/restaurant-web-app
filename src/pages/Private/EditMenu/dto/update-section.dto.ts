import { CreateSectionDto } from './';

export interface UpdateSectionDto extends Partial<CreateSectionDto> {
  id?: string;
  order?: number;
  isActive?: boolean;
  isPublic?: boolean;
}
