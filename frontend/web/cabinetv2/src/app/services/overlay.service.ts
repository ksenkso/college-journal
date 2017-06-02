import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OverlayService {

  private visible: Subject<boolean> = new Subject<boolean>();
  visible$ = this.visible.asObservable();

  constructor() {

  }

  toggle(): void {
    this.visible.next(true);
  }


}
