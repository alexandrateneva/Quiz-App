using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuizApp.Models
{
    public class QuestionsRequest
    {
        public int CategoryId { get; set; }

        public List<int> ForbiddenQuestionsIds { get; set; }
    }
}
