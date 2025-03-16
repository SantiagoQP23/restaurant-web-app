import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parseDate } from '../../../../helpers';
import { useAppDispatch } from '../../../../hooks';
import { selectOrders } from '../../../../redux';

/* import { pedidoStartSetdate } from '../actions/pedidos';
import { obtenerdateActual } from '../helpers/date';
import { selectPedidos } from '../reducers/';
import { useAppDispatch } from './useRedux';

 */

// export const useDate = () => {

//   const { date } = useSelector(selectOrders);

//   const dispatch = useAppDispatch();

//   const setdate = (date: string = '') => {
//     const dateActual = parseDate();

//     console.log('estableciendo la date: ', date)
//      date === ''
//       ?  dispatch(pedidoStartSetDate(dateActual))
//       :  dispatch( pedidoStartSetDate( parseDate(date) ));
//   }

//   return { date, setdate }
// }
