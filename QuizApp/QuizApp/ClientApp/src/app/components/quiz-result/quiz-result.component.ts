import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuizResultModel } from '../../core/models/quiz-result.model';
import { ResultService } from '../../core/services/result.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
   private quizResult: QuizResultModel;

  constructor(private spinner: NgxSpinnerService, private resultService: ResultService) { }

  ngOnInit() {
    this.spinner.show();
    this.resultService.currentQuizResult
      .subscribe(quizResult => {
        this.quizResult = quizResult
        this.spinner.hide();
      }, error => {
          console.error(error);
          this.spinner.hide();
      })
  }
}
