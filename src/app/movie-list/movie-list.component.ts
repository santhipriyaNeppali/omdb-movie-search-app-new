import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  totalResults = 0;
  @Output() itemSelected = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieSubsriber = this.movieService
      .getMovieLstSubject()
      .subscribe((res) => {
        this.movies = res['Search'] || [];
        this.totalResults = res['totalResults'];
        console.log(this.totalResults);
      });

    this.paginator.page.subscribe((event) => {
      this.movieService.getPaginatedList(event.pageIndex).subscribe((res) => {
        this.movies = res['Search'] || [];
      });
    });
  }

  ngOnDestroy() {
    this.movieSubsriber.unsubscribe();
  }

  selectItem(movie) {
    this.itemSelected.next(movie);
  }
}
