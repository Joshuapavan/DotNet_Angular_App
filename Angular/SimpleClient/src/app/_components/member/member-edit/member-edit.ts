import {
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Member } from '../../../_models/member';
import { Account } from '../../../_services/account';
import { MemberService } from '../../../_services/member.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditor } from "../../members/photo-editor/photo-editor";

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule, DatePipe, FormsModule, PhotoEditor],
  templateUrl: './member-edit.html',
  styleUrl: './member-edit.css',
})
export class MemberEdit implements OnInit {
  member?: Member;
  private accountService = inject(Account);
  private memberService = inject(MemberService);
  private toastr = inject(ToastrService);

  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  isAlertDissmissed = signal<boolean>(false);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user = this.accountService.currentUser();
    if (!user) return;
    this.memberService.getMembersByUserName(user.username).subscribe({
      next: (member) => (this.member = member),
    });
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: (_) => {
        this.toastr.success('Profile updated successfully.');
        this.editForm?.reset(this.member);
      },
    });
  }

  closeAlert() {
    this.isAlertDissmissed.set(true);
  }

  onMemberChange(event: Member){
    this.member = event;
  }
}
