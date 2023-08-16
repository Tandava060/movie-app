import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { BehaviorSubject } from 'rxjs';
import { MovieApiService } from './movie-api.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies$$ = new BehaviorSubject<Movie[]>([]);
  movies$ = this.movies$$.asObservable();

  constructor(private movieApiService: MovieApiService) { }

  getMovies(): void {
    this.movieApiService.fetchMovies().subscribe((movies: Movie[]) => {

      this.movies$$.next(movies);
    });
  };

} 
