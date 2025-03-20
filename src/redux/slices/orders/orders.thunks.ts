export const pedidoStart = () => {
  console.log('pedidoStart');
};

/* 
import { restauranteApi } from "../../../api";
import { AppThunk } from "../../store";
import { pedidoLoaded, pedidoSetActive, pedidoSetFecha } from "./orders.slice";
import { IOrder } from '../../../models/orders.model';

 */

// Establecer la fecha de los pedidos
/* export const pedidoStartSetFecha = (fecha: string): AppThunk => async (
  dispatch,
  getState) => {

  dispatch(pedidoSetFecha(fecha));

}; */

// Cargar los pedidos del dia
/* export const pedidoStartLoaded = (fecha: string): AppThunk => async (
  dispatch,
  getState) => {

  try {
    const {data} = await restauranteApi.get(`pedidos/?fecha=${fecha}`);

    dispatch(pedidoLoaded(data.pedidos))
    

  } catch (e) {
    console.log(e);
  }

}; */

// Añadir un pedido
/* export const pedidoStartAdded = (): AppThunk => async (
  dispatch,
  getState) => {

    try{

    const resp = await fetchConToken('pedidos/crear',{}, 'POST');
    const body = await resp.json();

    if(resp.ok){
      dispatch(pedidoAddNew(body.pedido));

    }else{
      Swal.fire('Error', body.msg, 'error');
    }

  } catch (error) {
    console.log(error);
  }
}; */

// Eliminar un pedido
/* export const pedidoStartDeleted = (idPedido: number): AppThunk => async (
  dispatch,
  getState) => {

    const resp = await fetchConToken(`pedidos/eliminar/${idPedido}` , {} ,  'DELETE');
    const body = await resp.json();

    if( resp.ok ) {
        dispatch( pedidoDeleted( idPedido ) );

    }else{
      Swal.fire('Error', body.msg, 'error');
    }


}; */

// Finalizar un pedido
/* export const pedidoStartUpdatedEstado = (idPedido: number): AppThunk => async (
  dispatch,
  getState) => {
    const resp = await fetchConToken(`pedidos/editar/estado/${idPedido}`,{},  'PUT');
    const body = await resp.json();
    
    if( resp.ok ) {
      dispatch( pedidoUpdatedEstado( false ) );

    }else{
      Swal.fire('Error', body.msg, 'error');
    }


}; */

/* export const pedidoStartSetActive = (pedido: IOrder): AppThunk => async (
  dispatch,
  getState) => {
    
    dispatch(pedidoSetActive(pedido));
    
};
 */
/*
export const pedidoStart = (fecha: string): AppThunk => async (
  dispatch,
  getState) => {

    dispatch();
  
};
 */
