import { Component, VERSION } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  errorMessage: string;
  type: NgModel;
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
      filter: this.type.value
    });
  }
}
