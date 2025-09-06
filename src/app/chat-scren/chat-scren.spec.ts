import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatScren } from './chat-scren';

describe('ChatScren', () => {
  let component: ChatScren;
  let fixture: ComponentFixture<ChatScren>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatScren]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatScren);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
