import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionModel } from '../models/question.model';
import { QuestionsRequestModel } from '../models/questions-request.model';
import { GlobalConstants } from '../../global-constants';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getFiveRandomQuestionsOfCategory(id: number, forbiddenQuestionsIds: number[]) {
    let model = new QuestionsRequestModel(id, (forbiddenQuestionsIds ? forbiddenQuestionsIds : new Array<number>()));
    let dataAsJSON = JSON.stringify(model);
    let url = this.baseUrl + GlobalConstants.GET_FIVE_QUESTIONS_URL;

    return this.http.post<QuestionModel[]>(url, dataAsJSON, this.httpOptions);
  }
}
