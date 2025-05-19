import { TestBed } from '@angular/core/testing';

import { AmplifyConfigService } from './amplify-config.service';

describe('AmplifyConfigService', () => {
  let service: AmplifyConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmplifyConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
