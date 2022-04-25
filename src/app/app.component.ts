import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  selectedItem: any = {};

  selectItem(item) {
    this.selectedItem = item;
  }
}
