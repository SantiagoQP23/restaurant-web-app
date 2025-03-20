import React, { FC } from 'react';
import { ProductStatus } from '../../models';
import { Label } from './Label';

interface Props {
  status: ProductStatus;
}

export const LabelProductStatus: FC<Props> = ({ status }) => {
  return (
    <>
      <Label color={status === ProductStatus.AVAILABLE ? 'success' : 'warning'}>
        {status === ProductStatus.AVAILABLE && 'Disponible'}
        {status === ProductStatus.OUT_OF_STOCK && 'Agotado'}
        {status === ProductStatus.OUT_OF_SEASON && 'Fuera de temporada'}
      </Label>
    </>
  );
};
