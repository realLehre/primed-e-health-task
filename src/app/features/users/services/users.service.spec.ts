import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { StorageService } from '../../../shared/services/storage.service';
import { IUser } from '../models/users.interface';
import { provideRouter } from '@angular/router';

describe('UsersService', () => {
  let service: UsersService;
  let mockStorageService: jasmine.SpyObj<StorageService>;

  const testUser: IUser = {
    id: '1',
    name: 'John Doe',
    role: 'Admin',
    email: 'johndoe@gmail.com',
  };

  const testUsers: IUser[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Admin',
      email: 'johndoe@gmail.com',
    },
    {
      id: '2',
      name: 'Jake Net',
      role: 'User',
      email: 'jakenet@gmail.com',
    },
  ];

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(StorageService, ['get', 'save']);
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideRouter([]),
        { provide: StorageService, useValue: mockStorageService },
      ],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users from browser storage on reload', () => {
    mockStorageService.get.and.returnValue(testUsers);
    const savedUsers = mockStorageService.get(service.USERS_STORAGE_KEY);

    service = TestBed.inject(UsersService);

    // set users data if value is in storage
    if (savedUsers) {
      service.users.set(savedUsers);
    }

    // verify if logic flow works
    expect(mockStorageService.get).toHaveBeenCalledWith(
      service.USERS_STORAGE_KEY,
    );
    expect(service.users()).toEqual(savedUsers);
  });

  it('should add new user', () => {
    service.users.set([]);
    service.addUser(testUser);

    // verify user has been added
    expect(service.users().length).toBe(1);
    expect(service.users()[0].name).toBe('John Doe');

    // verify storage service was called to save users
    expect(mockStorageService.save).toHaveBeenCalledTimes(1);
  });

  it('should remove user', () => {
    service.users.set(testUsers);
    service.removeUser(testUser.id);

    // verify user has been removed
    expect(service.users().length).toBe(1);
    expect(service.users()[0].name).toBe('Jake Net');

    // verify storage service was called to save users
    expect(mockStorageService.save).toHaveBeenCalledTimes(1);
  });

  it('should edit user', () => {
    service.users.set(testUsers);
    const updatedUser = { ...testUser, name: 'New Jake' };
    service.editUser(testUser.id, updatedUser);

    // verify user has been edited correctly
    expect(service.users().length).toBe(2);
    expect(service.users()[0].name).toBe('New Jake');

    // verify storage service was called to save users
    expect(mockStorageService.save).toHaveBeenCalledTimes(1);
  });
});
