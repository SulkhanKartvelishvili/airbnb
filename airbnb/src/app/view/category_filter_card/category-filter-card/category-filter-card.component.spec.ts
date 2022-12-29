import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFilterCardComponent } from './category-filter-card.component';

describe('CategoryFilterCardComponent', () => {
  let component: CategoryFilterCardComponent;
  let fixture: ComponentFixture<CategoryFilterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryFilterCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFilterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
