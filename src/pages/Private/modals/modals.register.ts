import NiceModal from '@ebay/nice-modal-react';

import { ModalCreateProduct } from '../Orders/views/Menu/components/ModalCreateProduct.component';
import { ModalDeleteTable } from '../Tables/components/ModalDeleteTable.component';

// import { DrawerOrder } from "../Orders/components/DrawerOrder.component";
import { DrawerProductsFilter } from '../Orders/views/Menu/components/DrawerProductsFilter.component';

export enum RegisteredModals {
  //Products
  ModalCreateProduct = 'ModalCreateProduct',

  //Tables
  ModalDeleteTable = 'ModalDeleteTable',

  //Orders
  DrawerOrder = 'DrawerOrder',

  DrawerProductsFilter = 'DrawerProductsFilter'
}

NiceModal.register(RegisteredModals.ModalCreateProduct, ModalCreateProduct);
NiceModal.register(RegisteredModals.ModalDeleteTable, ModalDeleteTable);
// NiceModal.register(RegisteredModals.DrawerOrder, DrawerOrder);
NiceModal.register(RegisteredModals.DrawerProductsFilter, DrawerProductsFilter);
