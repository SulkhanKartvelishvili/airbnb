import { TestBed } from '@angular/core/testing';

import { UserFrService } from './user-fr.service';

describe('UserFrService', () => {
  let service: UserFrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
