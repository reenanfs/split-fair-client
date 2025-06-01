import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { GroupService } from '@features/group/services/group.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnInit {
  groupCreationForm: FormGroup;

  constructor(
    public groupService: GroupService,
    private formBuilder: FormBuilder,
  ) {
    this.groupCreationForm = this.formBuilder.group({
      groupName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.groupService.retrieveGroups().subscribe();
  }

  handleGroupCreation() {
    if (this.groupCreationForm.valid) {
      this.groupService
        .createGroup(this.groupCreationForm.value.groupName)
        .subscribe({
          next: () => this.resetForm(),
          error: (error) => {
            console.log('An error ocurred!', error);
          },
        });
    }
  }

  private resetForm(): void {
    this.groupCreationForm.reset();
    this.groupCreationForm.markAsPristine();
    this.groupCreationForm.markAsUntouched();
    this.groupCreationForm.updateValueAndValidity();
  }
}
