import { Subject } from 'rxjs';
import { IOrderDetail, Order } from '../../../../models/orders.model';

export class SubjectEditOrderDetail {
  subject$ = new Subject<{
    value: boolean;
    detalle: IOrderDetail;
    orderId: string;
  }>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: boolean, detalle: IOrderDetail, orderId: string) {
    this.subject$.next({ value, detalle, orderId });
  }
}

export class SubjectDescriptionDetail {
  subject$ = new Subject<{ value: boolean; detalle: IOrderDetail }>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: boolean, detalle: IOrderDetail) {
    this.subject$.next({ value, detalle });
  }
}

export class SubjectDispatchDetail {
  subject$ = new Subject<{
    value: boolean;
    detalle: IOrderDetail;
    orderId: string;
  }>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: boolean, detalle: IOrderDetail, orderId: string) {
    this.subject$.next({ value, detalle, orderId });
  }
}
export class SubjectModalDeleteOrder {
  subject$ = new Subject<{ value: boolean; order: Order }>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: boolean, order: Order) {
    this.subject$.next({ value, order });
  }
}

export class SubjectModalPayOrder {
  subject$ = new Subject<{ value: boolean; order: Order }>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: boolean, order: Order) {
    this.subject$.next({ value, order });
  }
}
