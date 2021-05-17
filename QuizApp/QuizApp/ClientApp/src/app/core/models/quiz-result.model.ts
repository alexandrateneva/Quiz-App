export class QuizResultModel {
  constructor(
    public categoryId: number,
    public categoryName: string,
    public rightAnswersCount: number,
    public wrongAnswersCount: number
  ) { }
}
