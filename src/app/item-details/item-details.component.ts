import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.less'],
})
export class ItemDetailsComponent implements OnInit {
  @Input() item: any = {};

  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && !changes.item.isFirstChange()) {
      this.movieService.getMovie(this.item.Title).subscribe((res) => {
        this.item = Object.assign(this.item, res);
      });
    }
  }
}
