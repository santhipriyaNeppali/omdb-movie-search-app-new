import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Rating {
  Value: String;
  Source: String;
}

export interface Movie {
  Title: String;
  Year: String;
  Rated: String;
  Released: String;
  Runtime: String;
  Genre: String;
  Director: String;
  Writer: String;
  Actors: String;
  Plot: String;
  Language: String;
  Country: String;
  Awards: String;
  Poster: String;
  Ratings: Rating[];
  Metascore: String;
  imdbRating: String;
  imdbVotes: String;
  imdbID: String;
  Type: String;
  DVD: String;
  BoxOffice: String;
  Production: String;
  Website: String;
  Response: String;
}

const APIKEY: String = '9607b1ba'; //Hardcoded ideally must be in in server.
const URL = `https://www.omdbapi.com`;

@Injectable()
export class MovieService {
  private movieList = new BehaviorSubject<any>([]);
  private reqURL: string = '';
  private watchList = new Map();

  constructor(private http: HttpClient) {}

  /**
   * To get movie list with optional filters
   */
  getMovieList(
    args: { key: string; value: string },
    filterParams?: { type: string; year: number }
  ) {
    this.reqURL = `${URL}?${args.key}=${args.value}&apikey=${APIKEY}`;
    if (filterParams && filterParams.type) {
      this.reqURL += `&type=${filterParams.type}`;
    }
    if (filterParams && filterParams.year) {
      this.reqURL += `&y=${filterParams.year}`;
    }
    return this.http.get(this.reqURL);
  }

  /**
   * To get details of the item
   */
  getMovie(title) {
    return this.http.get(`${URL}?t=${title}&apikey=${APIKEY}`);
  }

  refreshMovieList(movieList) {
    this.movieList.next(movieList);
  }

  getMovieLstSubject() {
    return this.movieList;
  }

  /**
   * To get paginated list of movies
   */
  getPaginatedList(page) {
    return this.http.get(`${this.reqURL}&page=${page}`);
  }

  //WatchList CRUD operations
  addToWatchList(item: Movie) {
    this.watchList.set(item.imdbID, item);
  }

  removeFrmWatchList(item) {
    this.watchList.delete(item.imdbID);
  }

  isInWatchList(item) {
    return this.watchList.has(item.imdbID);
  }
}
