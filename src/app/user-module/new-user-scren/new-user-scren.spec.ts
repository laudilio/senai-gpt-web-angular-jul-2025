import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserScren } from './new-user-scren';

describe('NewUserScren', () => {
  let component: NewUserScren;
  let fixture: ComponentFixture<NewUserScren>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserScren]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserScren);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
