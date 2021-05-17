import { Injectable } from '@angular/core';
import { QuizResultModel } from '../models/quiz-result.model';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryService {
  constructor() { }

  saveQuizResultToUserHistory(quizResult: QuizResultModel) {
    let categoryId = quizResult.categoryId;
    let categoryName = quizResult.categoryName;
    let rightAnswers = quizResult.rightAnswersCount;
    let wrongAnsers = quizResult.wrongAnswersCount;

    let history = this.getUserQuizResulsHistory();
    if (history == null) {
      history = new Array<QuizResultModel>();
    }

    let index = history.findIndex(x => x.categoryId == categoryId);
    if (index == -1) {
      let categoryFirstResult = new QuizResultModel(categoryId, categoryName, rightAnswers, wrongAnsers);
      history.push(categoryFirstResult);
    }
    else {
      history[index].rightAnswersCount += rightAnswers;
      history[index].wrongAnswersCount += wrongAnsers;
    }

    localStorage.setItem('result', JSON.stringify(history));
  }

  getUserQuizResulsHistory(): QuizResultModel[] {
    var retrievedObject = localStorage.getItem('result');
    return JSON.parse(retrievedObject ? retrievedObject : '[]');
  }
}
