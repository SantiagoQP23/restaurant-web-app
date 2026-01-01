export interface UploadExcelResponseDto {
  success: boolean;
  message: string;
  summary: {
    sectionsCreated: number;
    sectionsUpdated: number;
    sectionsSkipped: number;
    categoriesCreated: number;
    categoriesUpdated: number;
    categoriesSkipped: number;
    productsCreated: number;
    productsUpdated: number;
    productsSkipped: number;
    errors: string[];
    totalRows: number;
    processedRows: number;
  };
}
