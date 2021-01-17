import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieslistComponent } from './movieslist/movieslist.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';


const routes: Routes = [
  { path: "", component: MovieslistComponent },
  { path: "details/:slug", component: MoviedetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
