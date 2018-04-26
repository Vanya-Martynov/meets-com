import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMeetsComComponent } from './login-meets-com.component';

describe('LoginMeetsComComponent', () => {
  let component: LoginMeetsComComponent;
  let fixture: ComponentFixture<LoginMeetsComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMeetsComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMeetsComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
