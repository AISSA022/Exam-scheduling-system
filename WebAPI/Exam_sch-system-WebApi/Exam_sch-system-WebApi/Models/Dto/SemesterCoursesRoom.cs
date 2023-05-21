namespace Exam_sch_system_WebApi.Models.Dto
{
    public class SemesterCoursesRoom
    {
        public int CourseId { get; set; }
        public string CourseName { get; set; }

        public string CourseCode { get; set; }
        public string Section { get; set; }

        public string Instructor { get; set; }
            
        public string RoomName { get; set; }

        public string PeriodName { get; set;}

        public int SemesterCourseId { get; set; }
    }
}
