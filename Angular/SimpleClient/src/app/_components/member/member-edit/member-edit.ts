import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Member } from '../../../_models/member';
import { Account } from '../../../_services/account';
import { MemberService } from '../../../_services/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule, DatePipe, FormsModule],
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
    console.log(this.member);
    this.toastr.success('Profile updated successfully.');
    this.editForm?.reset(this.member);
  }
}
