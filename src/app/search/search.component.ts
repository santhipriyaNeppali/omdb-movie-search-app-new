import { Component, VERSION } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Options } from '@angular-slider/ngx-slider';
import { Subscription } from 'rxjs';
import { constants } from '../utils/constants';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  errorMessage: string;
  subscriber: Subscription;

  //Default Search Parameters
  value: number = constants.MOVIE_SEARCH.YEAR.MIN;
  options: Options = {
    floor: constants.MOVIE_SEARCH.YEAR.MIN,
    ceil: constants.MOVIE_SEARCH.YEAR.MAX,
  };
  type = 'any';
  typeOptions = constants.MOVIE_SEARCH.TYPE_LABELS;

  constructor(private movieService: MovieService) {}
  sendSearch(event) {
    this.subscriber = this.movieService
      .getMovieList(
        { key: 's', value: event.srcElement.value },
        {
          type: this.type == 'any' ? null : this.type,
          year: this.value,
        }
      )
      .subscribe(
        (res) => {
          this.movieService.refreshMovieList(res);
        },
        (error) => {
          this.errorMessage = error['message'];
        }
      );
  }

  ngOnDestroy() {
    if (this.subscriber) this.subscriber.unsubscribe();
  }
}
