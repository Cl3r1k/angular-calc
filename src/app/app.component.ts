import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentValue = '0';

  addNumber(val: string) {
    if (this.currentValue === '0') {
      if (val === '0') {
        return;
      } else if (val >= '0' && val <= '9') {
        this.currentValue = val;
      } else {  // Dot pressed
        if (/^\d+\.?$/.test(this.currentValue + val) || /^\d+\.?\d+$/.test(this.currentValue + val)) {
          this.currentValue + val;
        }
      }
    }


  }
}
