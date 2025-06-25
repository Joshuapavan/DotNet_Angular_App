import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../../_models/member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { Account } from '../../../_services/account';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-photo-editor',
  imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './photo-editor.html',
  styleUrl: './photo-editor.css'
})
export class PhotoEditor implements OnInit {
  accountService = inject(Account);

  uploader?: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  member = input.required<Member>();
  memberChange = output<Member>();

  ngOnInit(): void {
      this.initilaizeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e;
  }

  initilaizeUploader(){
    this.uploader = new FileUploader(
      {
        url: this.baseUrl + "/users/add-photo",
        authToken: `Bearer ${this.accountService.currentUser()?.token}`,
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024,
      }
    );

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers ) => {
      const photo = JSON.parse(response);
      const updatedMember = {...this.member()}
      updatedMember.photos.push(photo);
      this.memberChange.emit(updatedMember);
    }
  }

  setImageAsMain(){
    
  }
}
