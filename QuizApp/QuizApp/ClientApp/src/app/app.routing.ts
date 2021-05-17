import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { CanExitGuard } from './core/guards/can-exit.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'quiz/:id/:name', component: QuizComponent, canDeactivate: [CanExitGuard] },
  { path: 'result', component: QuizResultComponent },
  { path: 'history', component: UserHistoryComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
