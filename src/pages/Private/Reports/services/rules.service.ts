import { RuleWeek } from '../models/rule-week.model';
import { RuleDay } from '../models/rule-day.model';
import { RuleWeather } from '../models/rule-weather.model';
import { restauranteApi } from '../../../../api';
import { loadAbort } from '../../../../helpers';
// import { UpdateRestaurantDto } from '../views/FootfallSimulation/dto/update-restaurant.dto';
// import { UpdateRuleDayDto } from '../views/FootfallSimulation/dto/update-rule-day.dto';
// import { UpdateRuleWeatherDto } from '../views/FootfallSimulation/dto/update-rule-weather';
// import { UpdateRuleWeekDto } from '../views/FootfallSimulation/dto/update-rule-week.dto';
import { Restaurant } from '../../Common/models/restaurant.model';
import { LoginResponse } from '@/models/dto/auth.dto';
// import { Restaurant } from '../models/restaurant.model';

// Temporary types until FootfallSimulation DTOs are created
type UpdateRestaurantDto = any;
type UpdateRuleDayDto = any;
type UpdateRuleWeatherDto = any;
type UpdateRuleWeekDto = any;

export const getRulesWeek = () => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<RuleWeek[]>(`rule-week`, {
      signal: controller.signal
    }),
    controller
  };
};

export const updateRulesWeek = (rulesWeek: UpdateRuleWeekDto[]) => {
  const controller = loadAbort();

  return {
    call: restauranteApi.patch<RuleWeek[]>(`rule-week`, rulesWeek, {
      signal: controller.signal
    }),
    controller
  };
};

export const getRulesDay = () => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<RuleDay[]>(`rule-day`, {
      signal: controller.signal
    }),
    controller
  };
};

export const updateRulesDay = (rulesDay: UpdateRuleDayDto[]) => {
  const controller = loadAbort();

  return {
    call: restauranteApi.patch<RuleDay[]>(`rule-day`, rulesDay, {
      signal: controller.signal
    }),
    controller
  };
};
export const updateRuleDay = (ruleDay: UpdateRuleDayDto) => {
  const controller = loadAbort();

  return {
    call: restauranteApi.patch<RuleDay>(`rule-day/${ruleDay.id}`, ruleDay, {
      signal: controller.signal
    }),
    controller
  };
};

export const getRulesWeather = () => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<RuleWeather>(`rule-weather`, {
      signal: controller.signal
    }),
    controller
  };
};

export const updateRulesWeather = (rulesWeather: UpdateRuleWeatherDto[]) => {
  const controller = loadAbort();

  return {
    call: restauranteApi.patch<RuleWeather[]>(`rule-weather`, rulesWeather, {
      signal: controller.signal
    }),
    controller
  };
};

export const getRestaurant = async (
  restaurantId: string
): Promise<LoginResponse> => {
  console.log({ restaurantId });
  const resp = await restauranteApi.get<LoginResponse>(
    `restaurant/${restaurantId}`
  );
  return resp.data;
};

export const updateRestaurant = async (
  restaurantId: string,
  restaurant: UpdateRestaurantDto
): Promise<Restaurant> => {
  const resp = await restauranteApi.patch<Restaurant>(
    `restaurant/${restaurantId}`,
    restaurant
  );
  return resp.data;
};
