import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { ExpenseWithSplit } from '@shared/models/expense/expense.model';
import { ResponseModel } from '@shared/models/http/response.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl: string = `${environment.apiUrl}/api/v1/expenses`;
  constructor(private http: HttpClient) {}

  createExpense(groupId: string): Observable<ResponseModel<ExpenseWithSplit>> {
    return this.http.post<ResponseModel<ExpenseWithSplit>>(this.apiUrl, {
      groupId,
    });
  }
}
