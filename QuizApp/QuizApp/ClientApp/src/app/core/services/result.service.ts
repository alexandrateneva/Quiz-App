import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuizResultModel } from '../models/quiz-result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private quizResult = new BehaviorSubject(new QuizResultModel(0, null, 0, 0));
  currentQuizResult = this.quizResult.asObservable();

  private forbiddenQuestionsIds = new BehaviorSubject(Array<number>());
  currentforbiddenQuestionsIds = this.forbiddenQuestionsIds.asObservable();

  constructor() { }

  changeQuizResult(quizResult: QuizResultModel) {
    this.quizResult.next(quizResult);
  }

  changeForbiddenQuestionsIds(forbiddenQuestionsIds: Array<number>) {
    this.forbiddenQuestionsIds.next(forbiddenQuestionsIds);
  }

  addForbiddenId(questionId: number) {
    const currentValue = this.forbiddenQuestionsIds.value;
    const updatedValue = [...currentValue, questionId];
    this.forbiddenQuestionsIds.next(updatedValue);
  }
}
