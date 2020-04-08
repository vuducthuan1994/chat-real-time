import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRealtimeComponent } from './chat-realtime.component';

describe('ChatRealtimeComponent', () => {
  let component: ChatRealtimeComponent;
  let fixture: ComponentFixture<ChatRealtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRealtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
