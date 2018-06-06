import { TestBed, inject } from '@angular/core/testing';

import { HoldAllUsersService } from './hold-all-users.service';

describe('HoldAllUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoldAllUsersService]
    });
  });

  it('should be created', inject([HoldAllUsersService], (service: HoldAllUsersService) => {
    expect(service).toBeTruthy();
  }));
});
