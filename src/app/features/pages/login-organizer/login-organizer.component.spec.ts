import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOrganizerComponent } from './login-organizer.component';

describe('LoginOrganizerComponent', () => {
  let component: LoginOrganizerComponent;
  let fixture: ComponentFixture<LoginOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginOrganizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
