import { useMemo } from 'react';
import { differenceInMinutes } from 'date-fns';
import { TIME_URGENCY } from '../constants/order.constants';

export interface TimeUrgency {
  color: 'error' | 'warning' | 'success' | 'info';
  severity: 'overdue' | 'urgent' | 'warning' | 'normal';
  shouldPulse: boolean;
  minutesRemaining: number;
}

/**
 * Hook to calculate urgency level based on delivery time
 * @param deliveryTime - The expected delivery time
 * @returns TimeUrgency object with color, severity, and pulse state
 */
export const useTimeUrgency = (deliveryTime: Date): TimeUrgency => {
  return useMemo(() => {
    const minutesRemaining = differenceInMinutes(
      new Date(deliveryTime),
      new Date()
    );

    if (minutesRemaining < TIME_URGENCY.OVERDUE) {
      return {
        color: 'error',
        severity: 'overdue',
        shouldPulse: true,
        minutesRemaining
      };
    }

    if (minutesRemaining < TIME_URGENCY.URGENT) {
      return {
        color: 'warning',
        severity: 'urgent',
        shouldPulse: true,
        minutesRemaining
      };
    }

    if (minutesRemaining < TIME_URGENCY.WARNING) {
      return {
        color: 'warning',
        severity: 'warning',
        shouldPulse: false,
        minutesRemaining
      };
    }

    return {
      color: 'success',
      severity: 'normal',
      shouldPulse: false,
      minutesRemaining
    };
  }, [deliveryTime]);
};
