import { Subject } from 'rxjs';
import { Holiday } from '../models/holiday.model';

export class SubjectHoliday {
  subject$ = new Subject<{ open: boolean; holiday: Holiday | undefined }>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(open: boolean, holiday: Holiday | undefined) {
    this.subject$.next({ open, holiday });
  }
}
