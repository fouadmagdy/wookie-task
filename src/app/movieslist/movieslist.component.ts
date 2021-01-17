import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { MoviesService } from '../movies.service'

@Component({
  selector: 'app-movieslist',
  templateUrl: './movieslist.component.html',
  styleUrls: ['./movieslist.component.scss']
})
export class MovieslistComponent implements OnInit, OnDestroy {

  // initalizedvalue of the movies and each categories

  categories = ['Action', 'Animation', 'Crime', 'Biography', 'Drama', 'Adventure']
  actionMovie = []
  animationMovie = []
  crimeMovie = []
  biographyMovie = []
  dramaMovie = []
  adventureMovie = []
  movies = []
  isLoading: boolean = false
  moviesSub: Subscription;

  constructor(public movieService: MoviesService) { }

  // here call the api and fetch all the movies

  ngOnInit(): void {
    this.isLoading = true

    this.movieService.getMovies('')

    this.moviesSub = this.movieService.getMovieUpdateListner().subscribe((postData: { movies }) => {
      this.isLoading = false

      this.actionMovie = []
      this.animationMovie = []
      this.crimeMovie = []
      this.biographyMovie = []
      this.dramaMovie = []
      this.adventureMovie = []
      this.movies = []



      // handle the grouping of the categories
      this.movies = postData.movies.movies
      this.movies.forEach(movie => {

        if (movie.genres.indexOf('Action') > -1) {
          this.actionMovie.push(movie)
        }
        if (movie.genres.indexOf('Drama') > -1) {
          this.dramaMovie.push(movie)
        }
        if (movie.genres.indexOf('Animation') > -1) {
          this.animationMovie.push(movie)
        }
        if (movie.genres.indexOf('Crime') > -1) {
          this.crimeMovie.push(movie)
        }
        if (movie.genres.indexOf('Biography') > -1) {
          this.biographyMovie.push(movie)
        }
        if (movie.genres.indexOf('Adventure') > -1) {
          this.adventureMovie.push(movie)
        }
      })
    })


  }

  ngOnDestroy() {
    this.moviesSub.unsubscribe();
  }

}
