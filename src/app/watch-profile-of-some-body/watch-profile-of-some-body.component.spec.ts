import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchProfileOfSomeBodyComponent } from './watch-profile-of-some-body.component';

describe('WatchProfileOfSomeBodyComponent', () => {
  let component: WatchProfileOfSomeBodyComponent;
  let fixture: ComponentFixture<WatchProfileOfSomeBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchProfileOfSomeBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchProfileOfSomeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
