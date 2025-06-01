import { Routes } from '@angular/router';

import { SettingsComponent } from '@features/settings/pages/settings/settings.component';
import { PublicContentComponent } from '@core/components/contents/public-content/public-content.component';
import { ProtectedContentComponent } from '@core/components/contents/protected-content/protected-content.component';
import { GroupsComponent } from '@features/group/pages/groups/groups.component';
import { GroupDetailComponent } from '@features/group/pages/group-details/group-detail.component';
import { DashboardComponent } from '@features/home/pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: ProtectedContentComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'groups',
        component: GroupsComponent,
      },
      {
        path: 'groups/:id',
        component: GroupDetailComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
  {
    path: '',
    component: PublicContentComponent,
    children: [],
  },
];
