import { Subject } from 'rxjs';
import { IUser } from '../../../../models/auth.model';

export class SubjectDeleteUser {
  subject$ = new Subject<{ value: boolean; user: IUser }>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: boolean, user: IUser) {
    this.subject$.next({ value, user });
  }
}
