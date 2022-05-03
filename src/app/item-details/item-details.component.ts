import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.less'],
})
export class ItemDetailsComponent implements OnInit {
  @Input() item: any = {};

  showSpinner: boolean = false;
  addedToWatchList: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && !changes.item.isFirstChange()) {
      this.showSpinner = true;
      if (!changes.item.currentValue) {
        this.showSpinner = false;
        this.item = {};
        return;
      }
      this.movieService.getMovie(this.item.Title).subscribe((res) => {
        this.showSpinner = false;
        this.item = Object.assign(this.item, res);
        this.addedToWatchList = this.movieService.isInWatchList(this.item);
      });
    }
  }

  addOrRemoveWatchList() {
    if (this.addedToWatchList) this.movieService.removeFrmWatchList(this.item);
    else this.movieService.addToWatchList(this.item);
    this.addedToWatchList = this.movieService.isInWatchList(this.item);
  }
}
