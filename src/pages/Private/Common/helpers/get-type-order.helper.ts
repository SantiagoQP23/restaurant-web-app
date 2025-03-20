import { TypeOrder } from '../../../../models';

export const getTypeOrder = (typeOrder: TypeOrder): string => {
  switch (typeOrder) {
    case TypeOrder.IN_PLACE:
      return 'Para servir';
    case TypeOrder.TAKE_AWAY:
      return 'Para llevar';
    default:
      return '';
  }
};
