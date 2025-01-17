import { inject, Injectable, signal } from '@angular/core';
import { IUser, IUserRoles } from '../models/users.interface';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly storageService = inject(StorageService);
  roles: IUserRoles[] = [
    { id: this.generateRandomId(), title: 'Admin' },
    { id: this.generateRandomId(), title: 'User' },
    { id: this.generateRandomId(), title: 'Super admin' },
    { id: this.generateRandomId(), title: 'Moderator' },
  ];
  users = signal<IUser[]>([]);
  activeUser = signal<IUser | null>(null);
  isDeleted = signal(false);
  USERS_STORAGE_KEY = 'sjdsjJI72402Hw2kswp';

  constructor() {
    const users = this.storageService.get(this.USERS_STORAGE_KEY);
    if (users) this.users.set(users);
  }

  addUser(user: Partial<IUser>) {
    let users: IUser[] = [...this.users()];
    users = [...users, { ...user, id: this.generateRandomId() } as IUser];
    this.updateUsersAndSaveToStorage(users);
  }

  removeUser(id: string) {
    const users: IUser[] = [...this.users()].filter((user) => user.id !== id);
    this.updateUsersAndSaveToStorage(users);
  }

  editUser(id: string, value: any) {
    let users: IUser[] = [...this.users()];
    users = users.map((user) =>
      user.id === id ? { ...user, ...value } : user,
    );
    this.updateUsersAndSaveToStorage(users);
  }

  updateUsersAndSaveToStorage(users: IUser[]) {
    this.users.set([...users]);
    this.storageService.save({
      key: this.USERS_STORAGE_KEY,
      value: this.users(),
    });
  }

  generateRandomId() {
    return Math.random().toString(36).slice(2, 12);
  }
}
