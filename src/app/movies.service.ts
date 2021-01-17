import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';



@Injectable({ providedIn: 'root' })

export class MoviesService {

  private movies = {};
  private movieUpdated = new Subject<{ movies }>()

  constructor(private http: HttpClient) { }

  // this method fetch all the movies from this apis or when pass a query its returned the search movies only

  getMovies(query) {
    console.log('query', query)
    this.http.get(`https://wookie.codesubmit.io/movies?q=${query}`, {
      headers: { 'Authorization': 'Bearer Wookie2019' }
    }).subscribe((movies) => {
      this.movies = movies
      this.movieUpdated.next({ movies: { ...this.movies } })
    })
  }

  getMovieUpdateListner() {
    return this.movieUpdated.asObservable();
  }

}
