// modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalVisibility = new BehaviorSubject<boolean>(false);
  modalVisible$ = this.modalVisibility.asObservable();

  private modalData = new BehaviorSubject({
    title: '',
    body: '',
    primaryText: '',
    secondaryText: '',
  });
  modalData$ = this.modalData.asObservable();

  private modalResponse = new Subject<boolean>();

  showModal(
    title: string,
    body: string,
    primaryText: string,
    secondaryText: string
  ): Promise<boolean> {
    this.modalData.next({ title, body, primaryText, secondaryText });
    this.modalVisibility.next(true);
    this.modalResponse = new Subject<boolean>();
    return this.modalResponse.toPromise().then((result) => result ?? false);

  }

  confirm() {
    this.modalVisibility.next(false);
    this.modalResponse.next(true);
  }

  cancel() {
    this.modalVisibility.next(false);
    this.modalResponse.next(false);
  }
}
