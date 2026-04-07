import { Component } from '@angular/core';
import { FantasyDashboardComponent } from './features/fantasy-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [FantasyDashboardComponent],
  template: '<app-fantasy-dashboard></app-fantasy-dashboard>',
  styleUrl: './app.scss'
})
export class App {
}
