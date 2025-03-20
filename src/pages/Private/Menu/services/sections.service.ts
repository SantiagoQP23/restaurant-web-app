import { restauranteApi } from '../../../../api';
import { loadAbort } from '../../../../helpers/';
import { ISection } from '../../../../models';

export const createSection = () => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<ISection[]>('/sections', {
      signal: controller.signal
    }),
    controller
  };
};
