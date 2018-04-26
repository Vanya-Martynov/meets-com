import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBirthdayComponent } from './user-birthday.component';

describe('UserBirthdayComponent', () => {
  let component: UserBirthdayComponent;
  let fixture: ComponentFixture<UserBirthdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBirthdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
