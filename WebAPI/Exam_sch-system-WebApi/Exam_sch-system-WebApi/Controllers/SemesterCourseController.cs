using Exam_sch_system_WebApi.Models;
using Exam_sch_system_WebApi.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                    c.Instructor
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
        [HttpPost("AddStudentsToCourse/{semesterId}/{courseId}")]
        public async Task<IActionResult> AddStudentsToCourse(int[] studentIds, int semesterId, int courseId)
        {
            try
            {
                // Remove old records for the specified semester and course
                var oldRecords = _context.SemesterCourses
                    .Where(sc => sc.SemesterId == semesterId && sc.CourseId == courseId);

                _context.SemesterCourses.RemoveRange(oldRecords);

                // Add new records for the specified students, semester, and course
                foreach (var studentId in studentIds)
                {
                    var studentCourse = new SemesterCourse
                    {
                        StudentId = studentId,
                        SemesterId = semesterId,
                        CourseId = courseId
                    };

                    _context.SemesterCourses.Add(studentCourse);
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

        [HttpGet("GetStudentsInCourse/{semesterId}/{CourseId}")]
        public async Task<ActionResult<IEnumerable<StudentOfTheCourseDTO>>> GetStudentsInCourse(int semesterId,int CourseId)
        {
            
            var students = await _context.SemesterCourses.Where(r => r.SemesterId == semesterId && r.CourseId==CourseId).Select(n => new StudentOfTheCourseDTO
            {
                SemesterId=n.SemesterId,
                CourseId=n.CourseId,
                StudentId=n.StudentId,
                studentName=n.Student.FirstName,
                studentLastName=n.Student.LastName

            }).ToListAsync();
            if (students == null || students.Count() == 0)
            {
                return NotFound();
            }
            return students;
        }
    }
}
