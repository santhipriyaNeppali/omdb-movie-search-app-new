import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie, MovieService } from '../services/movie.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.less'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  movieSubsriber: Subscription;
  @Output() itemSelected = new EventEmitter();
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieSubsriber = this.movieService.movieList.subscribe((res) => {
      this.movies = res.Search || [];
    });
  }

  ngOnDestroy() {
    this.movieSubsriber.unsubscribe();
  }

  selectItem(movie) {
    this.itemSelected.next(movie);
  }
}
