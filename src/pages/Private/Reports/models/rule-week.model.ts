export enum ValidWeeks {
  FIRST = '1-8',
  SECOND = '9-15',
  THIRD = '15-19',
  FOURTH = '20-24',
  FIFTH = '25-31'
}

export interface RuleWeek {
  id: string;

  week: ValidWeeks;

  value: number;
}
