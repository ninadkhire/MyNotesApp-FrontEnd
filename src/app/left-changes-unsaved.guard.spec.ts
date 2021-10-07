import { TestBed } from '@angular/core/testing';

import { LeftChangesUnsavedGuardGuard } from './left-changes-unsaved.guard';

describe('LeftChangesUnsavedGuardGuard', () => {
  let guard: LeftChangesUnsavedGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeftChangesUnsavedGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
