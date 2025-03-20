import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

interface Props {
  actionClick?: () => void;
}

export const BtnCancel: FC<Props> = ({ actionClick }) => {
  const navigate = useNavigate();

  const cancel = () => {
    //navigate(-1)
    actionClick && actionClick();
  };

  return (
    <Button color='error' variant='outlined' onClick={() => cancel()}>
      Cancelar
    </Button>
  );
};
