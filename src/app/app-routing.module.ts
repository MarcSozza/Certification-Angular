import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './sentiment/sentiment.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sentiment/:id', component: SentimentComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
