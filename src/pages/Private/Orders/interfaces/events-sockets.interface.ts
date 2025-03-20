export enum EventsOnSocket {
  newOrder = 'new-order',
  createOrder = 'create-order',
  updateOrder = 'update-order',
  deleteOrder = 'delete-order',
  updateTable = 'update-table'
}

/**
 * Events emit socket
 * @version v1.1 22-12-2023 Adds bills's events
 */
export enum EventsEmitSocket {
  createOrder = 'create-order',
  updateOrder = 'update-order',
  changeTable = 'change-table',
  changeClient = 'change-client',
  updateOrderDetail = 'update-order-detail',
  addOrderDetail = 'add-order-detail',
  deleteOrderDetail = 'delete-order-detail',
  updateqtyDeliveredDetail = 'update-qty-delivered-detail',
  deleteOrder = 'delete-order',
  payOrder = 'pay-order',
  deliverOrder = 'deliver-order',
  createInvoice = 'create-invoice',
  updateInvoice = 'update-invoice',
  deleteInvoice = 'delete-invoice',
  updateTable = 'update-table',
  createBill = 'createBill',
  deleteBill = 'removeBill',
  updateBill = 'updateBill'
}
