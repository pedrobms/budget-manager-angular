import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserDetailsComponent } from '../user/components/user-details/user-details.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: UserDetailsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
