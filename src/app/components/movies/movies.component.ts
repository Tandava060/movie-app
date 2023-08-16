import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, debounceTime, map, startWith } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies$ = this.movieService.movies$;
  filteredMovies$!: Observable<Movie[]>;
  searchControl = new FormControl();

  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies();
    this.filteredMovies$ = this.getFileredMoviesObservable();
  }

  getFileredMoviesObservable() {
    return combineLatest([
      this.movies$,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        map(search => search!)
      )
    ]).pipe(
      map(([movies, search]) => this.filterMovies(movies, search)
      )
    );
  }

  private filterMovies(movies: Movie[], search: string): Movie[] {
    console.log(movies, search)
    return movies.filter(movie => movie.title.toLowerCase().includes(search.toLocaleLowerCase()));
  }

}



// const secondLargest = (arr: number[]) => {
//   first = arr[0]
//   second = arr[0];
//   arr.forEach((num, index) => {
//     if (index === 0) continue;
//     if (num > largest && num > second) {
//       largest = num;
//       second = largest;
//     } else if (num > second && num < largest) {
//       second = num;
//     }

//   })
// }
