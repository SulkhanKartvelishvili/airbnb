import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelInnerComponent } from './hotel-inner.component';

describe('HotelInnerComponent', () => {
  let component: HotelInnerComponent;
  let fixture: ComponentFixture<HotelInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelInnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
