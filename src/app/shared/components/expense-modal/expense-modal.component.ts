import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '@shared/models/user/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface ExpenseModalDialogData {
  groupId: string;
  members: User[];
}

@Component({
  selector: 'app-expense-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './expense-modal.component.html',
  styleUrl: './expense-modal.component.scss',
})
export class ExpenseModalComponent {
  public expenseCreationForm: FormGroup;
  readonly dialogRef = inject(MatDialogRef<ExpenseModalComponent>);
  readonly data = inject<ExpenseModalDialogData>(MAT_DIALOG_DATA);

  constructor(private formBuilder: FormBuilder) {
    this.expenseCreationForm = this.formBuilder.group({
      description: ['', Validators.required],
      totalAmount: ['', Validators.required],
      currency: ['', Validators.required],
      category: [''],
      splitWith: [''],
    });
  }

  submit() {
    if (this.expenseCreationForm.valid) {
      this.dialogRef.close(this.expenseCreationForm.value);
    }
  }

  onSubmit(): void {
    if (this.expenseCreationForm.invalid) {
      return;
    }

    console.log('call expense service');
    this.dialogRef.close();
    // this.expenseService
    //   .createExpense(this.data.groupId, this.expenseCreationForm.value)
    //   .subscribe({
    //     next: () => {
    //       this.dialogRef.close();
    //     },
    //     error: (err) => {
    //       console.error('Failed to create expense', err);
    //     },
    //   });
  }
}
