export interface UpdateRestaurantDto {
  id: string;
  name?: string;
  address?: string;
  capacity?: number;
  identification?: string;
  phone?: string;
  email?: string;
  percentageAttendance?: number;
  simulationStartDate?: string;
  simulationEndDate?: string;
  lastSimulationUpdate?: Date;
  lastPredictionUpdate?: Date;
}
