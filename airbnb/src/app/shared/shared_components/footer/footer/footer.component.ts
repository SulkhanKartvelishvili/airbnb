import { Component, OnInit } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
 userData!:any;
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || 'null');

  }
  faGlobe = faGlobe;

 
   
}
