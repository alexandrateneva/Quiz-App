namespace QuizApp.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Text.Json;
    using System.Threading.Tasks;

    public static class FileHelper
    {
        public static async Task<IEnumerable<T>> ReadFileAndDeserializeJSON<T> (string filePath)
        {
            try
            {
                using (var sr = new StreamReader(filePath))
                {
                    var jsonString = await sr.ReadToEndAsync();
                    var objects = JsonSerializer.Deserialize<T[]>(jsonString);
                    return objects;
                }
            }
            catch (IOException e)
            {
                Console.WriteLine(e.Message);
            }
            return default;
        }
    }
}
