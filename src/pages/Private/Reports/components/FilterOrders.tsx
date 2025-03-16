import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { selectAuth } from '../../../../redux';

/* import { useFecha } from '../../hooks/useFecha';
import { IUsuario } from '../../interfaces';
import { parsearFecha } from '../../helpers/fecha';
import { selectAuth } from '../../reducers/authSlice'; */

interface Props {}

export const FilterOrders: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const {fecha, setFecha } = useFecha();
  const [estadoPedidos, setEstadoPedidos] = React.useState(10);

  const {} = useSelector(selectAuth);

  const cambiarFecha = (fecha: Date) => {
    // la fecha se guarda como string
    /*   setFecha(parsearFecha(fecha));
  
      navigate(`?fecha=${parsearFecha(fecha)}`); */
  };
  // onChange={(value) => cambiarFecha(value as Date)}
  // renderInput={(params) => <TextField {...params} />}

  return (
    <>
      <Grid item xs={6} lg={3}>
        <FormControl fullWidth color='primary'>
          <MobileDatePicker
            label='Fecha'
            inputFormat='dd/MM/yyyy'
            value={new Date()}
            onChange={(e: any) => console.log(e)}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </FormControl>
      </Grid>

      <Grid item xs={6} md={2} lg={3}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Estado</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={estadoPedidos}
            label='Estado de pedidos'
          >
            <MenuItem key={10} value={10}>
              Todos
            </MenuItem>
            <MenuItem key={20} value={20}>
              Activos
            </MenuItem>
            <MenuItem key={30} value={30}>
              Finalizados
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={3}>
        <FormControl fullWidth>
          <InputLabel id='select-meseros' color='primary'>
            Mesero
          </InputLabel>
          <Select labelId='select-meseros' label='Meseros' value={1000}>
            {/*  usuarios.map((usuario) => (
                 <MenuItem key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nombres}</MenuItem>
                 
                 )
                 ) */}
            <MenuItem key={1000} value={1000}>
              {'Todos'}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};
