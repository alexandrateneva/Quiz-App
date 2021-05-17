namespace QuizApp.Tests
{
    using Microsoft.AspNetCore.Mvc;
    using QuizApp.Controllers;
    using QuizApp.Models;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Xunit;

    public class QuizControllerTests
    {
        private readonly QuizController contoller;

        public QuizControllerTests()
        {
            // Arrange before each
            contoller = new QuizController();
        }

        [Fact]
        public async Task Get_5_questions_valid_return_type()
        {
            //Arrange
            var questionsRequest = new QuestionsRequest() { 
                CategoryId = 1,
                ForbiddenQuestionsIds = new List<int> { 1, 3, 9, 11 }
            };

            //Act
            var actionResult = await contoller.GetFiveQuestionsFromCategoryExcept(questionsRequest);

            //Assert
            var objResult = Assert.IsType<OkObjectResult>(actionResult);
            Assert.IsAssignableFrom<IEnumerable<Question>>(objResult.Value);
        }

        [Fact]
        public async Task Get_5_questions_valid_collection_lenght()
        {
            //Arrange
            var questionsRequest = new QuestionsRequest()
            {
                CategoryId = 1,
                ForbiddenQuestionsIds = new List<int> { 2, 5, 6, 8 }
            };

            //Act
            var actionResult = await contoller.GetFiveQuestionsFromCategoryExcept(questionsRequest) as ObjectResult;
            var result = actionResult.Value as IEnumerable<Question>;
            //Assert
            Assert.Equal(5, result.Count());
        }

        [Fact]
        public async Task Get_5_questions_valid_category_type()
        {
            //Arrange
            var questionsRequest = new QuestionsRequest()
            {
                CategoryId = 1,
                ForbiddenQuestionsIds = new List<int> { 2, 5, 6, 8 }
            };

            //Act
            var actionResult = await contoller.GetFiveQuestionsFromCategoryExcept(questionsRequest) as ObjectResult;
            var result = actionResult.Value as IEnumerable<Question>;
            var categoryType = result.Select(x => x.CategoryId).Distinct();

            //Assert
            Assert.Single(categoryType);
            Assert.Equal(1, categoryType.FirstOrDefault());
        }

        [Fact]
        public async Task Get_5_questions_ignore_forbidden_questions_ids()
        {
            //Arrange
            var questionsRequest = new QuestionsRequest()
            {
                CategoryId = 1,
                ForbiddenQuestionsIds = new List<int> { 2, 5, 6, 8 }
            };

            //Act
            var actionResult = await contoller.GetFiveQuestionsFromCategoryExcept(questionsRequest) as ObjectResult;
            var result = actionResult.Value as IEnumerable<Question>;
            var questionsIds = result.Select(x => x.Id);

            //Assert
            questionsRequest.ForbiddenQuestionsIds.ForEach(x => Assert.DoesNotContain(x, questionsIds));
        }

        [Fact]
        public async Task Get_5_questions_invalid_category_Id()
        {
            //Arrange
            var questionsRequest = new QuestionsRequest()
            {
                CategoryId = 9,
                ForbiddenQuestionsIds = new List<int> { 2, 5, 9 }
            };

            //Act
            var actionResult = await contoller.GetFiveQuestionsFromCategoryExcept(questionsRequest);

            //Assert
            var objResult = Assert.IsType<BadRequestObjectResult>(actionResult);
            var message = Assert.IsAssignableFrom<string>(objResult.Value);
            Assert.Equal("Тhere are no relevant questions in this category!", message);
        }
    }
}
