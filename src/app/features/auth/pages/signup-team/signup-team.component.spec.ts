import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTeamComponent } from './signup-team.component';

describe('SignupTeamComponent', () => {
  let component: SignupTeamComponent;
  let fixture: ComponentFixture<SignupTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
