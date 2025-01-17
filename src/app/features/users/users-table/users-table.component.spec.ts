import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTableComponent } from './users-table.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { IUser } from '../models/users.interface';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTableComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTableComponent);
    fixture.componentRef.setInput('usersData', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show table when usersData is not empty', () => {
    fixture.componentRef.setInput('usersData', [...testUsers]);

    fixture.detectChanges();

    // get table element from the dom
    const usersTable = fixture.debugElement.query(
      By.css('[data-test-id="users-table"]'),
    );

    expect(usersTable).toBeTruthy();
  });

  it('should show a No users added yet text when usersData is an empty array', () => {
    fixture.detectChanges();

    // get p tag from the dom
    const message = fixture.debugElement.query(
      By.css('[data-test-id="no-users"]'),
    );

    expect(message).toBeTruthy();
  });
});
