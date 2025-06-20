import { Component, inject, OnInit } from '@angular/core';
import { ModalService } from '../../../_services/modal';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal implements OnInit {
  visible: boolean = false;
  modalTitle: string = '';
  modalBody: string = '';
  modalPrimaryOption: string = '';
  modalSecondaryOption: string = '';
  response: boolean = false;

  modalService = inject(ModalService);

  ngOnInit(): void {
    this.modalService.modalVisible$.subscribe((visible) => {
      this.visible = visible;
    });

    this.modalService.modalData$.subscribe((data) => {
      this.modalTitle = data.title;
      this.modalBody = data.body;
      this.modalPrimaryOption = data.primaryText;
      this.modalSecondaryOption = data.secondaryText;
    });
  }

  onConfirm() {
    this.modalService.confirm();
    this.close();
  }

  onCancel() {
    this.modalService.cancel();
    this.close();
  }

  close() {
    const modalElement = document.getElementById('unsavedChangesModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }
}
