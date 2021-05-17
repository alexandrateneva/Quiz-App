namespace QuizApp.Tests
{
    using Microsoft.AspNetCore.Mvc;
    using QuizApp.Controllers;
    using QuizApp.Models;
    using System.Threading.Tasks;
    using Xunit;

    public class CategoryControllerTests
    {
        private readonly CategoryController contoller;

        public CategoryControllerTests()
        {
            // Arrange before each
            contoller = new CategoryController();
        }

        [Fact]
        public async Task Get_category_by_id_valid_return_type()
        {
            //Arrange
            var categoryId = 1;

            //Act
            var actionResult = await contoller.GetById(categoryId);

            //Assert
            var objResult = Assert.IsType<OkObjectResult>(actionResult);
            Assert.IsAssignableFrom<Category>(objResult.Value);
        }

        [Fact]
        public async Task Get_right_category_by_id()
        {
            //Arrange
            var categoryId = 1;

            //Act
            var actionResult = await contoller.GetById(categoryId) as ObjectResult;
            var category = actionResult.Value as Category;

            //Assert
            Assert.Equal(categoryId, category.Id);
        }

        [Fact]
        public async Task Get_category_by_id_invalid_id()
        {
            //Arrange
            var categoryId = 9;

            //Act
            var actionResult = await contoller.GetById(categoryId);

            //Assert
            var objResult = Assert.IsType<NotFoundObjectResult>(actionResult);
            var message = Assert.IsAssignableFrom<string>(objResult.Value);
            Assert.Equal("There is no category with this Id!", message);
        }

        [Fact]
        public async Task Get_all_categories_valid_return_type()
        {
            //Act
            var actionResult = await contoller.GetAll();

            //Assert
            var objResult = Assert.IsType<OkObjectResult>(actionResult);
            Assert.IsAssignableFrom<Category[]>(objResult.Value);
        }

        [Fact]
        public async Task Get_all_categories_right_count()
        {
            //Act
            var actionResult = await contoller.GetAll() as ObjectResult;
            var categories = actionResult.Value as Category[];

            //Assert
            Assert.Equal(5, categories.Length);
        }
    }
}
