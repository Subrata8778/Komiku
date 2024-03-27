import { TestBed } from '@angular/core/testing';

import { KomikService } from './komik.service';

describe('KomikService', () => {
  let service: KomikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KomikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
