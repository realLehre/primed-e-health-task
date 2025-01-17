import { computed, inject, Injectable } from '@angular/core';
import { UsersService } from '../../users/services/users.service';
import { IUser } from '../../users/models/users.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardAnalyticsService {
  private userService = inject(UsersService);
  users = this.userService.users;
  totalUsers = computed(() => this.users().length);
  rolesDistribution = computed(() => {
    return this.users().reduce((acc: any, user: IUser) => {
      acc[user.role] ? (acc[user.role] += 1) : (acc[user.role] = 1);
      return acc;
    }, {});
  });

  constructor() {}
}
