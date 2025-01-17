import { TestBed } from '@angular/core/testing';

import { DashboardAnalyticsService } from './dashboard-analytics.service';
import { provideRouter } from '@angular/router';

describe('DashboardAnalyticsService', () => {
  let service: DashboardAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    service = TestBed.inject(DashboardAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
