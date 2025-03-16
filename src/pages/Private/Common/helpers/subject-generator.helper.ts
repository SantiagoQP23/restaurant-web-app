import { Subject } from 'rxjs';

export class SubjectGenerator<T> {
  subject$: Subject<T> = new Subject<T>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: T) {
    this.subject$.next(value);
  }
}
