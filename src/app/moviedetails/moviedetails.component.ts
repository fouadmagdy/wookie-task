import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { MoviesService } from '../movies.service'
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.scss']
})
export class MoviedetailsComponent implements OnInit, OnDestroy {

  // initialize values of the selected movies
  private movieSlug: string;
  movies = []
  isLoading: boolean = false

  backdrop: string = ""
  title: string = ""
  year: string = ""
  length: string = ""
  director: string = ""
  casts = []
  description: string = ""

  moviesSub: Subscription;

  videoStarValue = 0
  totalstar = 10;

  constructor(public movieService: MoviesService, public route: ActivatedRoute) { }

  // fetch the selected movie by its slug and init all its value on this global values and then inject them in the template

  ngOnInit(): void {
    this.isLoading = true
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.movieSlug = paramMap.get('slug');
    })

    this.movieService.getMovies('')


    this.moviesSub = this.movieService.getMovieUpdateListner().subscribe((postData: { movies }) => {
      this.isLoading = false

      this.movies = postData.movies.movies

      this.movies.map(movie => {
        if (movie.slug === this.movieSlug) {
          this.title = movie.title
          this.year = movie.released_on
          this.length = movie.length
          this.director = movie.director
          this.casts.push(movie.cast)
          this.description = movie.overview
          this.backdrop = movie.backdrop
          this.videoStarValue = movie.imdb_rating
        }
      })

    })
  }




  ngOnDestroy() {
    this.moviesSub.unsubscribe();
  }

}
