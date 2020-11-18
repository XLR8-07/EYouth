import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  {path:'',  component: HomePageComponent},
  { path: 'auth', component: AuthComponent},
  {path: 'dashboard', component: DashBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
