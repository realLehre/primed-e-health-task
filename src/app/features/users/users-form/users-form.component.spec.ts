import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFormComponent } from './users-form.component';
import { UsersService } from '../services/users.service';
import { provideRouter } from '@angular/router';

describe('UsersFormComponent', () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFormComponent],
      providers: [UsersService, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
