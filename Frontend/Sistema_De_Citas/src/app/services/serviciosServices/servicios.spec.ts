import { TestBed } from '@angular/core/testing';

import { ServiciosServices } from './servicios';

describe('Servicios', () => {
  let service: ServiciosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
