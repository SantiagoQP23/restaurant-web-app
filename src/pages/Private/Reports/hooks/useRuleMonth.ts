import { useMutation, useQuery } from '@tanstack/react-query';
import { getRulesMonth, updateRuleMonth } from '../services/rule-month.service';
import { RuleMonth } from '../models/rule-month.model';
import { UpdateRuleMonthDto } from '../dto/update-rule-month.dto';
import { useSnackbar } from 'notistack';
import { queryClient } from '../../../../api/query-client';

export const useRuleMonth = () => {
  const rulesMonthQuery = useQuery(['rule-month'], getRulesMonth);

  return {
    rulesMonthQuery
  };
};

export const useUpdateRuleMonth = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<RuleMonth, unknown, UpdateRuleMonthDto>(updateRuleMonth, {
    onSuccess: () => {
      enqueueSnackbar('Mes actualizado', { variant: 'success' });
      queryClient.invalidateQueries(['rule-month']);
    },
    onError: () => {
      enqueueSnackbar('Error al actualizar el mes', { variant: 'error' });
    }
  });
};
