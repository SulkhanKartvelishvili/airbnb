import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  

  @Input() data!:any; 

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
