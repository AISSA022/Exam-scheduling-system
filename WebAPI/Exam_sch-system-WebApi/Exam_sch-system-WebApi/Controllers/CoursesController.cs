using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Exam_sch_system_WebApi.Models;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;

        public CoursesController(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
          if (_context.Courses == null)
          {
              return NotFound();
          }
            return await _context.Courses.ToListAsync();
        }

     
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
          if (_context.Courses == null)
          {
              return NotFound();
          }
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var courses = _context.Courses.FirstOrDefault(u => u.CourseId == id);

            // If the user doesn't exist, return a 404 Not Found
            if (courses == null)
            {
                return NotFound();
            }

            // Update the user's properties with the new values
            courses.CourseName=course.CourseName;
            courses.CourseCode=course.CourseCode;
            courses.Section=course.Section;
            courses.Instructor=course.Instructor;

            // Save the changes to the database
            _context.SaveChanges();

            // Return a 204 No Content response
            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(Course course)
        {
          if (_context.Courses == null)
          {
              return Problem("Entity set 'ExamAttendanceSystemContext.Courses'  is null.");
          }
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourse", new { id = course.CourseId }, course);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            if (_context.Courses == null)
            {
                return NotFound();
            }
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseExists(int id)
        {
            return (_context.Courses?.Any(e => e.CourseId == id)).GetValueOrDefault();
        }
    }
}
