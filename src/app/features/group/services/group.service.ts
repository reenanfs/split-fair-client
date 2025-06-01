import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable, of, tap } from 'rxjs';

import { GroupDetails } from '@features/group/models/group-details.model';
import {
  ListResponseModel,
  ResponseModel,
} from '@shared/models/http/response.model';
import { Group } from '@features/group/models/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl: string = `${environment.apiUrl}/api/v1/groups`;

  private groupsSubject = new BehaviorSubject<Group[] | null>(null);
  public groups$ = this.groupsSubject.asObservable();

  private groupDetailsMap = new Map<string, GroupDetails>();
  private groupDetailsMapSubject = new BehaviorSubject<
    Map<string, GroupDetails>
  >(this.groupDetailsMap);

  constructor(private http: HttpClient) {}

  createGroup(name: string): Observable<ResponseModel<Group>> {
    return this.http
      .post<ResponseModel<Group>>(this.apiUrl, {
        name,
      })
      .pipe(
        tap(({ data: newGroup }) => {
          const currentGroups = this.groupsSubject.value || [];
          this.groupsSubject.next([...currentGroups, newGroup]);
        }),
      );
  }

  retrieveGroups(
    forceRefresh: boolean = false,
  ): Observable<ListResponseModel<Group>> {
    const cachedUserGroups = this.groupsSubject.value;
    if (cachedUserGroups && !forceRefresh) {
      return of({
        ok: true,
        message: 'Returning from cache',
        data: cachedUserGroups,
      });
    }
    return this.http
      .get<ListResponseModel<Group>>(this.apiUrl)
      .pipe(tap(({ data: userGroups }) => this.groupsSubject.next(userGroups)));
  }

  retrieveGroupDetails(
    groupId: string,
    forceRefresh: boolean = false,
  ): Observable<ResponseModel<GroupDetails>> {
    const cachedGroupDetails = this.groupDetailsMap.get(groupId);

    if (cachedGroupDetails && !forceRefresh) {
      return of({
        ok: true,
        message: 'Returning from cache',
        data: cachedGroupDetails,
      });
    }

    return this.http
      .get<ResponseModel<GroupDetails>>(`${this.apiUrl}/${groupId}/details`)
      .pipe(
        tap(({ data: groupDetails }) => {
          this.groupDetailsMap.set(groupId, groupDetails);
          this.groupDetailsMapSubject.next(new Map(this.groupDetailsMap));
        }),
      );
  }
}
