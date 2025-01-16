import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users-form',
  imports: [],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFormComponent {}
