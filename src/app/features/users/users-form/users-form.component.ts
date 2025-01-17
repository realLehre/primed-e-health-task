import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
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
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private readonly userService = inject(UsersService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  activeUser = this.userService.activeUser;
  roles = this.userService.roles;
  userForm!: FormGroup;
  isEditing = computed(() => !!this.activeUser());
  isDeleted = this.userService.isDeleted;
  routerUrl = toSignal(
    this.router.events.pipe(
      tap(() => {
        // prepopulate form depending on the state
        if (this.isEditing()) {
          this.userForm.setValue({
            name: this.activeUser()?.name,
            email: this.activeUser()?.email,
            role: this.activeUser()?.role,
          });
        }
        if (this.isDeleted()) {
          this.userForm.reset();
          this.userService.isDeleted.set(false);
        }
      }),
    ),
  );

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
    const userData = this.userForm.value;

    // if edit mode is on, call the edit method else add the new user
    this.isEditing()
      ? this.userService.editUser(this.activeUser()?.id!, userData)
      : this.userService.addUser(userData);

    this.cancelOrResetForm();
  }

  cancelOrResetForm() {
    this.userForm.reset();
    this.userService.cancelOrResetForm();
  }

  ngOnDestroy() {
    this.userService.activeUser.set(null);
  }
}
