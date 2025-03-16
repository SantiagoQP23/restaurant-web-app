import { Subject } from 'rxjs';
import { ICreateOrderDetail } from '../models/orders.model';

export class SubjectManager {
  subject$ = new Subject<{ value: boolean; detalle: ICreateOrderDetail }>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: boolean, detalle: ICreateOrderDetail) {
    this.subject$.next({ value, detalle });
  }
}

export class SubjectModal {
  subject$ = new Subject<{ value: boolean }>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject({ value }: { value: boolean }) {
    this.subject$.next({ value });
  }
}
