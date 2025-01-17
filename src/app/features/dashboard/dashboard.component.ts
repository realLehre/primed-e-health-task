import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DashboardAnalyticsService } from './services/dashboard-analytics.service';
import { KeyValuePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [KeyValuePipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardAnalyticsService);
  totalUsers = this.dashboardService.totalUsers;
  rolesDistribution = this.dashboardService.rolesDistribution;
}
