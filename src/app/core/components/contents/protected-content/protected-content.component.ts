import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { LayoutComponent } from '@core/components/layout/layout.component';

@Component({
  selector: 'app-protected-content',
  standalone: true,
  imports: [LayoutComponent, AmplifyAuthenticatorModule, RouterOutlet],
  templateUrl: './protected-content.component.html',
  styleUrl: './protected-content.component.scss',
})
export class ProtectedContentComponent {}
