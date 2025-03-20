import { restauranteApi } from '../../../../api';
import { UpdateRuleMonthDto } from '../dto/update-rule-month.dto';
import { RuleMonth } from '../models/rule-month.model';

export const getRulesMonth = async (): Promise<RuleMonth[]> => {
  const resp = await restauranteApi.get<RuleMonth[]>('rule-month');

  return resp.data;
};

export const updateRuleMonth = async (
  ruleMonth: UpdateRuleMonthDto
): Promise<RuleMonth> => {
  const { id, ...data } = ruleMonth;

  const resp = await restauranteApi.patch<RuleMonth>(`rule-month/${id}`, data);

  return resp.data;
};
