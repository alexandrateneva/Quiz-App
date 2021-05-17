namespace QuizApp.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using QuizApp.Helpers;
    using QuizApp.Models;
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private static readonly Random Random = new();

       [HttpPost]
       public async Task<ActionResult> GetFiveQuestionsFromCategoryExcept(QuestionsRequest questionsRequest)
        {
            try
            {
                // usually get from DB
                var allQuestions = await FileHelper.ReadFileAndDeserializeJSON<Question>(Constants.DbQuestionsFilePath);

                var allAllowedQuestionsByCategory = allQuestions
                    .Where(x => x.CategoryId == questionsRequest.CategoryId
                        && !questionsRequest.ForbiddenQuestionsIds.Contains(x.Id))
                    .ToArray();

                if(allAllowedQuestionsByCategory.Length < 5)
                {
                    return BadRequest(Constants.NoRelevantQuestionsWithCategoryIdMessage);
                }

                var questionsIndexes = new int[5];
                for (int i = 0; i < 5; i++)
                {
                    var randomQuestionIndex = this.GiveRandomNumber(0, allAllowedQuestionsByCategory.Length - 1);
                    while (questionsIndexes.Contains(randomQuestionIndex))
                    {
                        randomQuestionIndex = this.GiveRandomNumber(0, allAllowedQuestionsByCategory.Length - 1);
                    }
                    questionsIndexes[i] = randomQuestionIndex;
                }

                return Ok(allAllowedQuestionsByCategory.Where((v, i) => questionsIndexes.Contains(i)));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        private int GiveRandomNumber(int startNum, int endNum)
        {
            return Random.Next(startNum, endNum);
        }    
    }
}
