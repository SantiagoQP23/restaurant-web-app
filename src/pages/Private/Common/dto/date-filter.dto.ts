// import { Period } from "../../..//models/period.model";

import { GroupBy, Period } from './period.model';

export interface DateFilterDto {
  startDate?: Date | null;
  endDate?: Date | null;
  period?: Period;
  groupBy?: GroupBy;
}
