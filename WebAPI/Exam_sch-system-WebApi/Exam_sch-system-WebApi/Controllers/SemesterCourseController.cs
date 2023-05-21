using Exam_sch_system_WebApi.Models;
using Exam_sch_system_WebApi.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SemesterCourseController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;

        public SemesterCourseController(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        [HttpGet("GetCoursesBySemester/{sid}")]
        public async Task<ActionResult<IEnumerable<Course>>> GetCoursesBySemester(int sid)
        {
            var courses = await _context.Courses
                .Where(c => c.SemesterCourses.Any(sc => sc.Semester.SemesterId == sid))
                .Select(c => new
                {
                    c.CourseId,
                    c.CourseName,
                    c.CourseCode,
                    c.Section,
                    c.Instructor,
                })
                .ToListAsync();

            return Ok(courses);
        }
        [HttpGet("GetSemester")]
        public async Task<ActionResult<IEnumerable<Semester>>> GetSemester()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Semesters.ToListAsync();
        }
        [HttpGet("GetStudents")]
        public async Task<ActionResult<IEnumerable<StudentDTO>>> GetStudents()
        {
           var students=await _context.Users.Where(r=>r.RoleId==3).Select(n=> new StudentDTO
           {
               Id=n.Id,
               FirstName=n.FirstName,
               LastName=n.LastName
           }).ToListAsync();
            if(students==null || students.Count() == 0)
            {
                return NotFound();
            }
            return students;
        }
        [HttpPost("AddStudentsToCourse/{semesterCourseId}")]
        public async Task<IActionResult> AddStudentsToCourse(int[] studentIds, int semesterCourseId)
        {
            try
            {   
                // Remove old records for the specified semester and course

/*                var oldRecords = _context.StudentSemesters
                    .Where();*/

                var sc = _context.StudentSemesters.Where(x=>x.SemesterCourseId == semesterCourseId);

                _context.StudentSemesters.RemoveRange(sc);

                // Add new records for the specified students, semester, and course
                foreach (var studentId in studentIds)
                {
                    var studentCourse = new StudentSemester
                    {
                        StudentId = studentId,
                        SemesterCourseId = semesterCourseId,
                    };

                    _context.StudentSemesters.Add(studentCourse);
                }

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                // Handle any errors and return an appropriate response
                return StatusCode(500, "An error occurred while adding students to the course.");
            }
        }
        //////////////////////////////////////////////////////////////////

        [HttpGet("GetStudentsInCourse/{semesterCourseId}")]
        public async Task<ActionResult> GetStudentsInCourse(int semesterCourseId)
        {

            var courses = _context.StudentSemesters.Where(c => c.SemesterCourseId == semesterCourseId).Include(x => x.Student).Include(x=>x.SemesterCourse).ToList();

            List<int>  user = new List<int>();

            foreach (var course in courses)
            {

                user.Add( course.Student.Id
                );
            }

            
            return Ok(JsonConvert.SerializeObject(user.ToArray(), Formatting.None,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }));
        }
        [HttpGet("GetStudentsDetails/{semesterCourseId}")]
        public async Task<ActionResult> GetStudentsDetails(int semesterCourseId)
        {

            var courses = _context.StudentSemesters.Where(c => c.SemesterCourseId == semesterCourseId).Include(x => x.Student).Include(x => x.SemesterCourse).ToList();

            List<StudentDTO> user = new List<StudentDTO>();

            foreach (var course in courses)
            {

                user.Add(new StudentDTO
                {
                    Id=course.Student.Id,
                    FirstName=course.Student.FirstName,
                    LastName=course.Student.LastName
                }
                );
            }


            return Ok(JsonConvert.SerializeObject(user, Formatting.None,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }));
        }
    }
}
