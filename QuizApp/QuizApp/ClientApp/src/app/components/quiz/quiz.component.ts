import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuestionModel } from '../../core/models/question.model';
import { QuizResultModel } from '../../core/models/quiz-result.model';
import { QuizService } from '../../core/services/quiz.service';
import { ResultService } from '../../core/services/result.service';
import { CanExit } from '../../core/guards/can-exit.guard';
import { ConfirmationDialogService } from '../../core/services/confirmation-dialog.service';
import { UserHistoryService } from '../../core/services/user-history.service';
import { GlobalConstants } from '../../global-constants';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit, CanExit {
  private quizResult: QuizResultModel;
  private questions: Array<QuestionModel>;
  private categoryId: number;
  private categoryName: string;
  private currentQuestionIndex: number;
  private rightQuestionsNumber: number;
  private currentQuestion: QuestionModel;

  constructor(private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private resultService: ResultService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private userHistoryService: UserHistoryService)
  {
    this.rightQuestionsNumber = 0;
    this.currentQuestionIndex = 0;
    this.categoryId = this.route.snapshot.params['id'];
    this.categoryName = this.route.snapshot.params['name'];
  }

  ngOnInit() {
    this.spinner.show();

    this.resultService.currentforbiddenQuestionsIds
        .pipe(take(1))
      .subscribe(forbiddenQuestionsIds => {
        this.quizService.getFiveRandomQuestionsOfCategory(this.categoryId, forbiddenQuestionsIds)
          .subscribe(data => {
            this.questions = data;
            this.currentQuestion = this.questions[this.currentQuestionIndex];

            this.resultService.changeForbiddenQuestionsIds([]);

            this.spinner.hide();
          }, error => {
            console.error(error);
            this.spinner.hide();
          });      
      }, error => {
        console.error(error);
        this.spinner.hide();
      });    
  }

  receiveAnswer(isTheAnswerCorrect: boolean) {
    this.resultService.addForbiddenId(this.currentQuestion.id);

    if (isTheAnswerCorrect) {
      this.rightQuestionsNumber++;
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex == GlobalConstants.QUESTIONS_NUMBER) {
      this.setFinalQuizResult();
      this.router.navigateByUrl('/result', { state: { bypassFormGuard: true } });
    }
    else {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  setFinalQuizResult() {
    let quizResult = new QuizResultModel(this.categoryId, this.categoryName, this.rightQuestionsNumber, (GlobalConstants.QUESTIONS_NUMBER - this.rightQuestionsNumber));
    this.resultService.changeQuizResult(quizResult);
    this.resultService.changeForbiddenQuestionsIds([]);
    this.userHistoryService.saveQuizResultToUserHistory(quizResult);
  }

  canDeactivate(): Promise<boolean> | boolean {
    return this.confirmationDialogService.confirm(GlobalConstants.PLEASE_CONFIRM_MESSAGE, GlobalConstants.PLEASE_CONFIRM_LEAVING_A_QUIZ_MESSAGE)
      .then((confirmed) => confirmed)
      .catch(() => false);
  }
}
