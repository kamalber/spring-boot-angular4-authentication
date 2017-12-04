import { TestBed, inject } from '@angular/core/testing';

import { FacebookCustomService } from './facebook-custom.service';

describe('FacebookCustomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookCustomService]
    });
  });

  it('should be created', inject([FacebookCustomService], (service: FacebookCustomService) => {
    expect(service).toBeTruthy();
  }));
});
