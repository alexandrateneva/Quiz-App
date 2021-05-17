export class QuestionsRequestModel {
  constructor(
    public categoryId: number,
    public forbiddenQuestionsIds: Array<number>
  ) { }
}
