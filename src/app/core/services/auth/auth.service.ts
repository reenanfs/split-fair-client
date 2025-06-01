import { Injectable } from '@angular/core';
import { from, map, catchError, of, Observable } from 'rxjs';
import { getCurrentUser } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserId(): Observable<string | null> {
    return from(getCurrentUser()).pipe(
      map((user) => user?.userId || null),
      catchError(() => of(null)),
    );
  }
}
