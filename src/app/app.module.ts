import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieService } from './services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { ItemDetailsComponent } from './item-details/item-details.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    NgxSliderModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    MovieListComponent,
    ItemDetailsComponent,
  ],
  bootstrap: [AppComponent],
  providers: [MovieService],
})
export class AppModule {}
