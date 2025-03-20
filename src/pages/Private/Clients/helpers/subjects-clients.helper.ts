import { Subject } from 'rxjs';
import { IClient } from '../../../../models/client.model';

export class SubjectDeleteClient {
  subject$ = new Subject<{ value: boolean; client: IClient }>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: boolean, client: IClient) {
    this.subject$.next({ value, client });
  }
}
