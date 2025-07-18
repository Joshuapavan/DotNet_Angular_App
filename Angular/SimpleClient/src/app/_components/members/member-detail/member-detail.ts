import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../_services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Photo } from '../../../_models/photo';

@Component({
  selector: 'app-member-detail',
  imports: [TabsModule, DatePipe, GalleryModule],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css',
})
export class MemberDetail implements OnInit {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  member?: Member;

  images: GalleryItem[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;

    this.memberService.getMembersByUserName(username).subscribe({
      next: (member) => {
        this.member = member;
        member.photos.map((photo: Photo) => {
          this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
        });
      },
    });
  }
}
