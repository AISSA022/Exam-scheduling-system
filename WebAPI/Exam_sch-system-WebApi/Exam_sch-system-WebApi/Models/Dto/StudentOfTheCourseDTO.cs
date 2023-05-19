namespace Exam_sch_system_WebApi.Models.Dto
{
    public class StudentOfTheCourseDTO
    {
        public int SemesterId { get; set; }
        public int CourseId { get; set;}
        public int StudentId { get; set;}
        public string studentName { get; set; }

        public string studentLastName { get; set; }


    }
}
