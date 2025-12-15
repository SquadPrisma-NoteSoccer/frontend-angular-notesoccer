import { TestBed } from '@angular/core/testing';

import { SignupLeagueService } from './signup-league.service';

describe('SignupLeagueService', () => {
  let service: SignupLeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupLeagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
