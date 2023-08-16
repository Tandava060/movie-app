import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieApi } from '../models/movie-api.model';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private movieApiUrl = 'https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON';

  constructor(private readonly http: HttpClient) { }

  fetchMovies(): Observable<Movie[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', 'tokensjsks');
    return this.http.get<MovieApi[]>(this.movieApiUrl, { headers }).pipe(
      map((moviesApi: MovieApi[]) => {
        return moviesApi.map((movieApi: MovieApi) => {

          return {
            title: movieApi.Title,
            year: movieApi.Year,
            genre: movieApi.Genre,
            actors: movieApi.Actors,
            plot: movieApi.Plot,
          };
        });
      }
      ));
  }
}
