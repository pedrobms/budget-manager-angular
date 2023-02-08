import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserDetailsComponent } from './user/components/user-details/user-details.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { TransactionDetailsComponent } from './transaction/components/transaction-details/transaction-details.component';
import { CategoryFormComponent } from './category/components/category-form/category-form.component';
import { TransactionFormComponent } from './transaction/components/transaction-form/transaction-form.component';
import { CategoryListComponent } from './category/components/category-list/category-list.component';
import { CategoryDetailsComponent } from './category/components/category-details/category-details.component';

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: UserDetailsComponent },
    { path: 'transaction/add', component: TransactionFormComponent},
    { path: 'transaction/:id', component: TransactionDetailsComponent },
    { path: 'category', component: CategoryListComponent},
    { path: 'category/add', component: CategoryFormComponent },
    { path: 'category/:id', component: CategoryDetailsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
