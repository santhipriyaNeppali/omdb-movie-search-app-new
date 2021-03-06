import { Component, ElementRef, ViewChild } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Options } from '@angular-slider/ngx-slider';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  Subscription,
  tap,
} from 'rxjs';
import { constants } from '../utils/constants';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  errorMessage: string;
  subscriber: Subscription;
  @ViewChild('input', { static: true }) input: ElementRef;

  //Default Search Parameters
  value: number = constants.MOVIE_SEARCH.YEAR.MIN;
  options: Options = {
    floor: constants.MOVIE_SEARCH.YEAR.MIN,
    ceil: constants.MOVIE_SEARCH.YEAR.MAX,
  };
  type = 'any';
  typeOptions = constants.MOVIE_SEARCH.TYPE_LABELS;

  constructor(private movieService: MovieService) {}

  sendSearch(value) {
    this.subscriber = this.movieService
      .getMovieList(
        { key: 's', value },
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

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((event: KeyboardEvent) => {})
      )
      .subscribe((res) => this.sendSearch(this.input.nativeElement.value));
  }

  ngOnDestroy() {
    if (this.subscriber) this.subscriber.unsubscribe();
  }
}
