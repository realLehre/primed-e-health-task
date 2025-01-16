import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UsersService);
  roles = this.userService.roles;
  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      role: [null, Validators.required],
    });
  }

  get name(): FormControl {
    return <FormControl>this.userForm.get('name');
  }

  get email(): FormControl {
    return <FormControl>this.userForm.get('email');
  }

  get role(): FormControl {
    return <FormControl>this.userForm.get('role');
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    console.log(this.userForm.value);
  }
}
