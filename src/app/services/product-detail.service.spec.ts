/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductDetailService } from './product-detail.service';

describe('Service: ProductDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDetailService]
    });
  });

  it('should ...', inject([ProductDetailService], (service: ProductDetailService) => {
    expect(service).toBeTruthy();
  }));
});
