import { TestBed } from '@angular/core/testing';

import { SignupTeamService } from './signup-team.service';

describe('SignupTeamService', () => {
  let service: SignupTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
