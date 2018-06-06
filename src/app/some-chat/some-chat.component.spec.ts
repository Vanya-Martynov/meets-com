import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeChatComponent } from './some-chat.component';

describe('SomeChatComponent', () => {
  let component: SomeChatComponent;
  let fixture: ComponentFixture<SomeChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomeChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
