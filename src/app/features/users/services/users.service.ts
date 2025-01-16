import { Injectable } from '@angular/core';
import { IUserRoles } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  roles: IUserRoles[] = [
    { id: this.generateRandomId(), title: 'Admin' },
    { id: this.generateRandomId(), title: 'User' },
    { id: this.generateRandomId(), title: 'Super admin' },
    { id: this.generateRandomId(), title: 'Moderator' },
  ];
  constructor() {}

  generateRandomId() {
    return Math.random().toString(36).slice(2, 12);
  }
}
