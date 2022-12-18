import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredHotelCardComponent } from './filtered-hotel-card.component';

describe('FilteredHotelCardComponent', () => {
  let component: FilteredHotelCardComponent;
  let fixture: ComponentFixture<FilteredHotelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredHotelCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredHotelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
