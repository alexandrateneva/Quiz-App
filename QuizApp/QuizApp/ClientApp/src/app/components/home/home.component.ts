import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private currentClass: string = 'hide';

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.currentClass = 'show';
    }, 500)
  }
}
