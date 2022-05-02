import { Component, VERSION } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  errorMessage: string;
  type: NgModel;
  value: number = 1980;
  highValue: number = 2013;
  options: Options = {
    floor: 1970,
    ceil: 2015,
  };
  constructor(private movieService: MovieService) {}
  sendSearch(event) {
    this.movieService
      .getMovieList({ key: 's', value: event.srcElement.value })
      .subscribe(
        (res) => {
          this.movieService.refreshMovieList(res);
        },
        (error) => {
          this.errorMessage = error['message'];
        }
      );
  }

  filterSearch() {
    this.movieService.filterSearch({
      filter: this.type.value,
    });
  }
}
