import {
  AfterViewInit,
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
export class MovieListComponent implements OnInit, AfterViewInit {
  movies: Movie[] = [];
  movieSubscriber: Subscription;
  paginatorSubscriber: Subscription;
  totalResults = 0;
  noResults: boolean = false;
  error: string = null;
  showSpinner = false;

  @Output() itemSelected = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieSubscriber = this.movieService
      .getMovieLstSubject()
      .subscribe((res) => {
        this.itemSelected.next(null);
        this.movies = res['Search'] || [];
        this.totalResults = res['totalResults'];
        if (this.paginator) this.paginator.firstPage();
        this.error = res['Error'];
        this.noResults = this.movies.length == 0;
        if (!this.noResults) this.subscribePaginator();
      });
  }

  ngAfterViewInit() {
    this.subscribePaginator();
  }

  subscribePaginator() {
    if (!this.paginator) return;
    this.paginatorSubscriber = this.paginator.page.subscribe((event) => {
      this.showSpinner = true;
      this.movieService.getPaginatedList(event.pageIndex).subscribe((res) => {
        this.movies = res['Search'] || [];
        this.noResults = this.movies.length == 0;
        this.showSpinner = false;
      });
    });
  }

  ngOnDestroy() {
    if (this.movieSubscriber) this.movieSubscriber.unsubscribe();
    if (this.paginatorSubscriber) this.paginatorSubscriber.unsubscribe();
  }

  selectItem(movie) {
    this.itemSelected.next(movie);
  }
}
