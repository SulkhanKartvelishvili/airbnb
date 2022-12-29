
import { Component, EventEmitter, Input,Output } from '@angular/core';

@Component({
  selector: 'app-category-filter-card',
  templateUrl: './category-filter-card.component.html',
  styleUrls: ['./category-filter-card.component.css']
})
export class CategoryFilterCardComponent {
  @Input()
  categoryCardItem:any;
  // @Output()
  // categoryCardItemIdEmitter:EventEmitter<any>=new EventEmitter();

  // getCategoryId(){
  //   this.categoryCardItemIdEmitter.emit(this.categoryCardItem.id);
  // }


}
