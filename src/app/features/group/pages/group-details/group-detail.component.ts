import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupDetails } from '@features/group/models/group-details.model';
import { GroupService } from '@features/group/services/group.service';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.scss',
})
export class GroupDetailComponent implements OnInit {
  groupDetails$: Observable<GroupDetails | null> = of(null);

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
  ) {}

  ngOnInit() {
    this.groupDetails$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => {
        if (id) {
          return this.groupService
            .retrieveGroupDetails(id)
            .pipe(map((res) => res.data));
        } else {
          return of(null);
        }
      }),
    );
  }
}
