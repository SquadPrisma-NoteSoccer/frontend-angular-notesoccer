import { TestBed } from '@angular/core/testing';

import { SignupOrganizerService } from './signup-organizer.service';

describe('SignupOrganizerService', () => {
  let service: SignupOrganizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupOrganizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
