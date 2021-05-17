import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuizResultModel } from '../../core/models/quiz-result.model';
import { UserHistoryService } from '../../core/services/user-history.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  private results: Array<QuizResultModel>;
  private allRightAnswersCount: number;
  private allWrongAnswersCount: number;

  constructor(private spinner: NgxSpinnerService, private userHistoryService: UserHistoryService) {
    this.results = new Array<QuizResultModel>();
  }

  ngOnInit() {
    this.results = this.userHistoryService.getUserQuizResulsHistory();
    this.allRightAnswersCount = this.results.map(a => a.rightAnswersCount).reduce((x, y) => x + y, 0);
    this.allWrongAnswersCount = this.results.map(a => a.wrongAnswersCount).reduce((x, y) => x + y, 0);
  }
}
