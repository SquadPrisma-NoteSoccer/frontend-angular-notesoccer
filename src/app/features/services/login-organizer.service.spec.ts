import { TestBed } from '@angular/core/testing';

import { LoginOrganizerService } from './login-organizer.service';

describe('LoginOrganizerService', () => {
  let service: LoginOrganizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginOrganizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
