import { Routes } from '@angular/router';
import { HomeComponent } from '@features/home/home.component';
import { SettingsComponent } from '@features/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];
