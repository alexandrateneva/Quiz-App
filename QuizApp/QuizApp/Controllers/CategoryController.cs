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
    public class CategoryController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                // usually get from DB
                var categories = await FileHelper.ReadFileAndDeserializeJSON<Category>(Constants.DbCategoryFilePath);
                return Ok(categories);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                // usually get from DB
                var categories = await FileHelper.ReadFileAndDeserializeJSON<Category>(Constants.DbCategoryFilePath);
                var category = categories.Where(c => c.Id == id).FirstOrDefault();
                if (category == null)
                {
                    return NotFound(Constants.InvalidCategoryIdMessage);
                }
                return Ok(category);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
