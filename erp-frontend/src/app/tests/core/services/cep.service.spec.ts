import { TestBed } from '@angular/core/testing';

import { CepService } from '../../../core/services/cep.service';

describe('CepService', () => {
  let service: CepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
