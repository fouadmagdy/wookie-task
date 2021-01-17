import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MoviesService } from '../movies.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(public movieService: MoviesService, private router: Router) { }

  ngOnInit(): void {
  }

  //Takes the search input value and pass it to the movie service to retreieve the searched movie

  onSubmit(form: NgForm) {
    this.movieService.getMovies(form.value.search)
    form.reset()
    this.router.navigate(['/'])
  }

}
