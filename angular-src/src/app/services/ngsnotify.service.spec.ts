import { TestBed, inject } from '@angular/core/testing';

import { NgsnotifyService } from './ngsnotify.service';

describe('NgsnotifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgsnotifyService]
    });
  });

  it('should be created', inject([NgsnotifyService], (service: NgsnotifyService) => {
    expect(service).toBeTruthy();
  }));
});
