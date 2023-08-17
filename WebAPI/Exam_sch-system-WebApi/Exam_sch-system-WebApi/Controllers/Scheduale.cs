using Exam_sch_system_WebApi.Models;
using Exam_sch_system_WebApi.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Scheduale : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;

        public Scheduale(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        //////////////////////////////
        [HttpPost("students")]
        public IActionResult GetStudentsByCourses([FromBody] List<int> courseIds)
        {
            try
            {
                var students = _context.SemesterCourses
                    .Where(sc => courseIds.Contains(sc.CourseId))
                    .SelectMany(sc => sc.StudentSemesters)
                    .Select(ss => ss.Student)
                    .Distinct()
                    .ToList();

                return Ok(students);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        //////////////////////////
        [HttpPost]
        public IActionResult DistributeStudents(int roomCapacity, int columns, int rows, [FromBody] List<Student> students)
        {
            try
            {
                // Shuffle the students to randomize their order
                Random random = new Random();
                students = students.OrderBy(x => random.Next()).ToList();

                // Calculate the total number of seats in the room
                int totalSeats = columns * rows;
                if (roomCapacity > totalSeats)
                {
                    return BadRequest("Room capacity exceeds the available seats.");
                }

                // Create a seating arrangement matrix
                var seatingArrangement = new string[rows, columns];
                int currentSeat = 0;

                // Distribute the students in the seating arrangement
                for (int row = 0; row < rows; row++)
                {
                    for (int column = 0; column < columns; column++)
                    {
                        if (currentSeat >= students.Count)
                        {
                            break;  // No more students to distribute
                        }

                        seatingArrangement[row, column] = students[currentSeat].StudentId.ToString();
                        currentSeat++;
                    }
                }

                // Convert the seating arrangement to a CSV file
                var csvContent = "StudentId,Row,Column\n";
                for (int row = 0; row < rows; row++)
                {
                    for (int column = 0; column < columns; column++)
                    {
                        var studentId = seatingArrangement[row, column];
                        var student = students.FirstOrDefault(s => s.StudentId.ToString() == studentId);
                        var rowNumber = row + 1;
                        var columnNumber = column + 1;
                        csvContent += $"{studentId},{rowNumber},{columnNumber}\n";
                    }
                }

                // Return the CSV file as a response
                var csvBytes = Encoding.UTF8.GetBytes(csvContent);
                return File(csvBytes, "text/csv", "seating_arrangement.csv");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        public class Student
        {
            public int StudentId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            // Add any other properties relevant to students
        }
        ///

    }
}
