import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { IUser } from '../models/users.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  usersData = input.required<IUser[]>();
  editUser = output<IUser>();
  deleteUser = output<IUser>();

  onEditUser(user: IUser) {
    this.editUser.emit(user);
    this.router.navigate([], {
      queryParams: { edit: true },
      relativeTo: this.route,
    });
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 70,
        behavior: 'smooth',
      });
    });
  }

  onDeleteUser(user: IUser) {
    this.deleteUser.emit(user);
  }
}
