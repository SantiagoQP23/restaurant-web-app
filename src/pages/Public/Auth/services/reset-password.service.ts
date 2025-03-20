import { restauranteApi } from '../../../../api';
import { loadAbort } from '../../../../helpers';

export const sendRequestResetPassword = (email: string) => {
  const controller = loadAbort();

  return {
    call: restauranteApi.patch(
      '/auth/request-reset-password',
      { email },
      { signal: controller.signal }
    ),
    controller
  };
};

export const resetPassword = (resetPasswordToken: string, password: string) => {
  const controller = loadAbort();

  return {
    call: restauranteApi.patch(
      '/auth/reset-password',
      { resetPasswordToken, password },
      { signal: controller.signal }
    ),
    controller
  };
};
