import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
export class UsersFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UsersService);
  private readonly router = inject(Router);
  private route = inject(ActivatedRoute);
  activeUser = this.userService.activeUser;
  roles = this.userService.roles;
  userForm!: FormGroup;
  isEditing = computed(() => !!this.activeUser());
  routerUrl = toSignal(
    this.router.events.pipe(
      tap(() => {
        if (this.activeUser()) {
          this.userForm.setValue({
            name: this.activeUser()?.name,
            email: this.activeUser()?.email,
            role: this.activeUser()?.role,
          });
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
    this.isEditing()
      ? this.userService.editUser(this.activeUser()?.id!, userData)
      : this.userService.addUser(userData);
    this.cancelOrResetForm();
  }

  cancelOrResetForm() {
    this.userForm.reset();
    this.userService.activeUser.set(null);
    this.router.navigate([], {
      queryParams: null,
      queryParamsHandling: 'replace',
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.userService.activeUser.set(null);
  }
}
