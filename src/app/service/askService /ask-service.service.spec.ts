import { TestBed } from '@angular/core/testing';

import { AskServiceService } from './ask-service.service';

describe('AskServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AskServiceService = TestBed.get(AskServiceService);
    expect(service).toBeTruthy();
  });
});
