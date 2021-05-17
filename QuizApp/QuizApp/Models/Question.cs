using System.Collections.Generic;

namespace QuizApp.Models
{
    public class Question
    {
        public Question() { }
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Summary { get; set; }
        public Dictionary<char, string> Answers { get; set; }
        public char RightAnswer { get; set; }
    }
}
