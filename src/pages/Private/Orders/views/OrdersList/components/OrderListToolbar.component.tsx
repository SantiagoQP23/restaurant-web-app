import { FC } from 'react';

import { styled } from '@mui/material/styles';

import { Toolbar, Grid, TextField } from '@mui/material';
import { IUser } from '../../../../../../models';

import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ComboBoxUser } from '../../../components/ComboBoxUser.component';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  // height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

interface Props {
  handleChangeUser: (value: IUser | null) => void;
  user: IUser | null;
  statusOrderFilter: string;
  changeStatus?: (status: string) => void;
  startDate: Date | null;
  handleChangeStartDate: (date: Date | null) => void;
  endDate: Date | null;
  handleChangeEndDate: (date: Date | null) => void;
}

export const OrderListToolbar: FC<Props> = ({
  handleChangeUser,
  user,

  startDate,
  handleChangeStartDate,
  endDate,
  handleChangeEndDate
}) => {
  return (
    <StyledRoot>
      <Grid
        container
        spacing={2}
        sx={{
          p: 1
        }}
      >
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DesktopDatePicker
            label='Fecha de inicio'
            inputFormat='yyyy-MM-dd'
            value={startDate}
            onChange={handleChangeStartDate}
            renderInput={(params) => <TextField {...params} />}
            maxDate={new Date()}
          />
        </Grid>

        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DesktopDatePicker
            label='Fecha de fin'
            inputFormat='yyyy-MM-dd'
            value={endDate}
            onChange={handleChangeEndDate}
            renderInput={(params) => <TextField {...params} />}
            maxDate={new Date()}
            minDate={startDate || undefined}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4}>
          <ComboBoxUser user={user} handleChangeUser={handleChangeUser} />
        </Grid>
      </Grid>
    </StyledRoot>
  );
};
