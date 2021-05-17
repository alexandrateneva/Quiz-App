export class QuestionModel {
  constructor(
    public id: number,
    public categoryId: number,
    public summary: string,
    public answers: { [key: string]: string },
    public rightAnswer: string
  ) { }
}
