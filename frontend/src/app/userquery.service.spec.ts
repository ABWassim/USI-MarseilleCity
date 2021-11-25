import { TestBed } from '@angular/core/testing';

import { UserqueryService } from './userquery.service';

describe('UserqueryService', () => {
  let service: UserqueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserqueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
