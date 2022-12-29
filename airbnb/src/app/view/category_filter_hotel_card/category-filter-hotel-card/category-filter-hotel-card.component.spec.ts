import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFilterHotelCardComponent } from './category-filter-hotel-card.component';

describe('CategoryFilterHotelCardComponent', () => {
  let component: CategoryFilterHotelCardComponent;
  let fixture: ComponentFixture<CategoryFilterHotelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryFilterHotelCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFilterHotelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
