import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

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
  movieList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  getMovie(args: { key: string; value: string }) {
    return this.http.get(`${URL}?${args.key}=${args.value}&apikey=${APIKEY}`);
  }

  refreshMovieList(movieList) {
    this.movieList.next(movieList);
  }
}
