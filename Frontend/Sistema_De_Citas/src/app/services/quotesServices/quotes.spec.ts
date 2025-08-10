import { TestBed } from '@angular/core/testing';

import { QuotesServices } from './quotes';

describe('Quotes', () => {
  let service: QuotesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
