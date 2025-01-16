import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersFormComponent } from './users-form/users-form.component';

@Component({
  selector: 'app-users',
  imports: [UsersFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {}
