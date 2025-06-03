import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GroupDetails } from '@features/group/models/group-details.model';
import { GroupService } from '@features/group/services/group.service';
import { ExpenseModalComponent } from '@shared/components/expense-modal/expense-modal.component';
import { first, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.scss',
})
export class GroupDetailComponent implements OnInit {
  groupDetails$: Observable<GroupDetails | null> = of(null);

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private dialog: MatDialog,
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

  openExpenseModal(): void {
    this.groupDetails$.pipe(first()).subscribe((groupDetails) => {
      if (groupDetails) {
        this.dialog.open(ExpenseModalComponent, {
          data: { group: groupDetails.group, members: groupDetails.members },
        });
      }
    });
  }
}
