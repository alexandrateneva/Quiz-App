import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { CategoriesComponent } from '../../components/categories/categories.component';
import { QuestionComponent } from '../../components/question/question.component';
import { QuizComponent } from '../../components/quiz/quiz.component';
import { QuizResultComponent } from '../../components/quiz-result/quiz-result.component';
import { ResultChartComponent } from '../../components/result-chart/result-chart.component';
import { UserHistoryComponent } from '../../components/user-history/user-history.component';
import { AppRoutingModule } from '../../app.routing';

@NgModule({
  declarations: [
    CategoriesComponent,
    QuestionComponent,
    QuizComponent,
    QuizResultComponent,
    ResultChartComponent,
    UserHistoryComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: []
})
export class QuizModule { }
