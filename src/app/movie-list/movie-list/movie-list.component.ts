import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie, MovieService } from '../../services/movie.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  movieSubsriber: Subscription;
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieSubsriber = this.movieService.movieList.subscribe((res) => {
      this.movies = res.Search || [];
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.movieSubsriber.unsubscribe();
  }
}
