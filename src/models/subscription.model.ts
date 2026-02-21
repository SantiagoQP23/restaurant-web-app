import { Restaurant } from '@/pages/Private/Common/models/restaurant.model';
import { Plan } from './plan.model';

export enum SubscriptionStatus {
  TRIAL = 'TRIAL',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED'
}

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  startDate: string; // YYYY-MM-DD
  endDate: string | null;
  trialEndsAt: string; // YYYY-MM-DD
  isActive: boolean;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime;
  restaurant: Restaurant;
  plan: Plan;
}
