import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  name = 'Angular ' + VERSION.major;
}
