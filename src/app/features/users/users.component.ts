import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersService } from './services/users.service';
import { IUser } from './models/users.interface';

@Component({
  selector: 'app-users',
  imports: [UsersFormComponent, UsersTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly userService = inject(UsersService);
  users = this.userService.users;

  editUser(user: IUser) {
    this.userService.activeUser.set(user);
  }

  deleteUser(user: IUser) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.removeUser(user.id);
      this.userService.activeUser.set(null);
    }
  }
}
