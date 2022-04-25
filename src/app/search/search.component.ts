import { Component, VERSION } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  errorMessage: string;
  type = 'any';
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
}
