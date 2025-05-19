import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '@core/components/layout/layout.component';

@Component({
  selector: 'app-public-content',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './public-content.component.html',
  styleUrl: './public-content.component.scss',
})
export class PublicContentComponent {}
