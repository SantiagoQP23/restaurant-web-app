export interface CreateSectionDto {
  name: string;
}

export interface UpdateSectionDto extends Partial<CreateSectionDto> {}
