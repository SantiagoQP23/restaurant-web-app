import React, { FC, useState } from 'react';
import { LabelStatusOrder } from '../../../components';
import {
  useTheme,
  Box,
  Button,
  Card,
  CardHeader,
  MobileStepper
} from '@mui/material';
import { useUpdateOrder } from '../../../hooks';
import { OrderStatus } from '../../../../../../models';
import { UpdateOrderDto } from '../../../dto';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

interface Props {
  orderId: string;
  status: OrderStatus;
}

export const EditOrderStatus: FC<Props> = ({ orderId, status }) => {
  const { mutate: updateOrder } = useUpdateOrder();
  const [activeStatus, setActiveStatus] = useState(getStepIndex(status));

  const theme = useTheme();

  const handleNext = () => {
    setActiveStatus((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStatus((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepIndex(status: OrderStatus) {
    switch (status) {
      case OrderStatus.PENDING:
        return 0;
      case OrderStatus.IN_PROGRESS:
        return 1;
      case OrderStatus.DELIVERED:
        return 2;
      default:
        return 0;
    }
  }

  const changeStatusOrder = (status: OrderStatus) => {
    const data: UpdateOrderDto = {
      id: orderId,
      status
    };

    updateOrder(data);
  };

  return (
    <Card>
      <CardHeader
        title='Estado'
        action={
          <Box display='flex' justifyContent='center'>
            {activeStatus === 0 && (
              <LabelStatusOrder status={OrderStatus.PENDING} />
            )}

            {activeStatus === 1 && (
              <LabelStatusOrder status={OrderStatus.IN_PROGRESS} />
            )}

            {activeStatus >= 2 && (
              <LabelStatusOrder status={OrderStatus.DELIVERED} />
            )}
          </Box>
        }
      />

      <Box>
        <MobileStepper
          steps={3}
          position='static'
          activeStep={activeStatus}
          sx={{
            background: 'transparent'
          }}
          nextButton={
            <Button
              size='small'
              onClick={handleNext}
              disabled={activeStatus === 3 - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size='small'
              onClick={handleBack}
              disabled={activeStatus === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </Card>
  );
};
