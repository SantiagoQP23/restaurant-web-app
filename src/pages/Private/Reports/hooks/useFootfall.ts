import { useQuery } from '@tanstack/react-query';
import {
  FootfallResponse,
  getFootfall,
  getSimulatedFootfall,
  executeSimulation,
  getPredictionFootfall,
  getComparisonFootfall,
  updateForecastFootfall
} from '../services/footfall.service';
import { useDateFilter } from '../../../../hooks/useDateFilter';
import { Period, GroupBy } from '../../Common/dto/period.model';
import { useEffect } from 'react';
import { queryClient } from '../../../../api/query-client';

export const useFootfall = () => {
  return useQuery(['footfall'], getFootfall, {});
};

export const useUpdateFootfallPrediction = () => {
  const updatePredictionQuery = useQuery(
    ['updateFootfallPrediction'],
    () => {
      return updateForecastFootfall();
    },
    {
      enabled: false,
      onSuccess: () => {
        queryClient.invalidateQueries(['forecastFootfall']);
      }
    }
  );

  return updatePredictionQuery;
};

export const useSimulatedFootfall = (period: Period, groupBy: GroupBy) => {
  const dateFilter = useDateFilter(period);

  const simulatedFootfallQuery = useQuery<FootfallResponse>(
    ['simulatedFootfall', dateFilter.startDate, dateFilter.endDate],
    () =>
      getSimulatedFootfall({
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
        period: dateFilter.period,
        groupBy
      }),
    {
      onSuccess: (data) => {
        console.log(data);
      }
    }
  );

  useEffect(() => {
    simulatedFootfallQuery.refetch();
  }, [dateFilter.startDate, dateFilter.endDate, dateFilter.period]);

  return {
    ...dateFilter,
    simulatedFootfallQuery
  };
};

export const useExecuteSimulation = () => {
  const executeSimulationQuery = useQuery(
    ['executeSimulation'],
    executeSimulation,
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(['simulatedFootfall']);
      }
    }
  );

  return executeSimulationQuery;
};

export const useForecastFootfall = () => {
  const forecastFootfallQuery = useQuery(
    ['forecastFootfall'],
    () => {
      return getPredictionFootfall();
    },
    {
      onSuccess: (data) => {
        console.log(data);
      }
    }
  );

  return forecastFootfallQuery;
};

export const useComparisonFootfall = (period: Period, groupBy: GroupBy) => {
  const dateFilter = useDateFilter(period);

  const comparisonFootfallQuery = useQuery(
    ['comparisonFootfall', dateFilter.startDate, dateFilter.endDate],
    () =>
      getComparisonFootfall({
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
        period: dateFilter.period,
        groupBy
      }),
    {
      onSuccess: (data) => {
        console.log(data);
      }
    }
  );

  useEffect(() => {
    comparisonFootfallQuery.refetch();
  }, [dateFilter.startDate, dateFilter.endDate, dateFilter.period]);

  return {
    ...dateFilter,
    comparisonFootfallQuery
  };
};
