import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent {
  groupCreationForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
    this.groupCreationForm = this.formBuilder.group({
      groupName: ['', Validators.required],
    });
  }

  createGroup() {
    if (this.groupCreationForm.valid) {
      this.http
        .post(`${environment.apiUrl}/api/v1/groups`, {
          name: this.groupCreationForm.value.groupName,
        })
        .subscribe({
          next: (res) => {
            console.log('Group created!', res);
            this.groupCreationForm.reset();
            this.groupCreationForm.markAsPristine();
            this.groupCreationForm.markAsUntouched();
            this.groupCreationForm.updateValueAndValidity();
          },
          error: (error) => {
            console.log('An error ocurred!', error);
          },
        });
    }
  }

  retrieveGroups() {
    this.http.get(`${environment.apiUrl}/api/v1/groups`).subscribe({
      next: (res) => {
        console.log('Groups retrieves!', res);
      },
      error: (error) => {
        console.log('An error ocurred!', error);
      },
    });
  }
}
