import { Routes } from '@angular/router';

import { HomeComponent } from '@features/home/home.component';
import { SettingsComponent } from '@features/settings/settings.component';
import { PublicContentComponent } from '@core/components/contents/public-content/public-content.component';
import { ProtectedContentComponent } from '@core/components/contents/protected-content/protected-content.component';

export const routes: Routes = [
  {
    path: '',
    component: ProtectedContentComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
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
