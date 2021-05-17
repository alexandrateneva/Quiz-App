import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from '../../global-constants';
import { QuestionModel } from '../../core/models/question.model';
import { ConfirmationDialogService } from '../../core/services/confirmation-dialog.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: QuestionModel;
  @Output() isTheAnswerCorrect = new EventEmitter<boolean>();
  private timeInSeconds: number = GlobalConstants.RESPONSE_TIME_IN_SECONDS;
  private timer: ReturnType<typeof setInterval>;
  private timeout: ReturnType<typeof setTimeout>;

  constructor(private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService) { }
 
  questionForm = new FormGroup({
    answer: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.startTimer();
    this.setTimeout();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    clearTimeout(this.timeout);
  }

  setTimeout() {
    this.timeout = setTimeout(() => {
      this.isTheAnswerCorrect.emit(false);
      this.refreshTimeout();
    }, this.timeInSeconds * 1000);
  }

  refreshTimeout() {
    clearTimeout(this.timeout);
    this.timeInSeconds = GlobalConstants.RESPONSE_TIME_IN_SECONDS;
    this.setTimeout();
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeInSeconds > 0) {
        this.timeInSeconds--;
      }
    }, 1000);
  }

  openConfirmationDialog() {
    if (this.questionForm.invalid) {
      return this.toastr.warning(GlobalConstants.CHOOSE_ANSWER_MESSAGE, GlobalConstants.WARNING_NOTIFICATION);
    }

    this.confirmationDialogService.confirm(GlobalConstants.PLEASE_CONFIRM_MESSAGE, GlobalConstants.PLEASE_CONFIRM_ANSWER_SUBMISSION_MESSAGE)
      .then((confirmed) => {
        if (confirmed) {
          this.submitAnswer();
        }
      })
      .catch(() => console.log(GlobalConstants.PLEASE_CONFIRM_ERROR_SUBMISSION_MESSAGE));
  }

  submitAnswer() {
    if (this.question.rightAnswer == this.questionForm.value['answer']) {
      this.toastr.success(GlobalConstants.CORRECT_ANSWER_NOTIFICATION, GlobalConstants.CORRECT_ANSWER_SHORT_NOTIFICATION);
      this.isTheAnswerCorrect.emit(true);
    }
    else {
      this.toastr.error(GlobalConstants.INCORRECT_ANSWER_NOTIFICATION, GlobalConstants.INCORRECT_ANSWER_SHORT_NOTIFICATION);
      this.isTheAnswerCorrect.emit(false);
    }
    this.questionForm.controls['answer'].reset();

    this.refreshTimeout();
  }
}
