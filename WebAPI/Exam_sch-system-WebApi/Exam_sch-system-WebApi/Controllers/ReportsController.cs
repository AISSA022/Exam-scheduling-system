using Exam_sch_system_WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : Controller
    {
        private readonly ExamAttendanceSystemContext _context;

        public ReportsController(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        [HttpGet("CountTimeConflicts")]
        public IActionResult CountTimeConflicts()
        {
            try
            {
                var count = _context.Reports.Count(r => r.Type == "Time Conflict");

                return Ok(count);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpGet("CountStudentConflicts")]
        public IActionResult CountStudentConflicts()
        {
            try
            {
                var count = _context.Reports.Count(r => r.Type == "Student Conflict");

                return Ok(count);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        //////////////////////
        [HttpGet("GetAllTimeConflict")]
        public IActionResult GetTimeConflicts()
        {
            var timeConflicts = _context.Reports.Where(r => r.Type == "Time Conflict").ToList();
            return Ok(timeConflicts);
        }
        //////////////
        [HttpGet("GetAllStudentConflict")]
        public IActionResult GetStudentConflicts()
        {
            var timeConflicts = _context.Reports.Where(r => r.Type == "Student Conflict").ToList();
            return Ok(timeConflicts);
        }
        ////////////////
        [HttpDelete("DeleteReport/{reportId}")]
        public IActionResult DeleteReport(int reportId)
        {
            var report = _context.Reports.FirstOrDefault(r => r.ReportId == reportId);

            if (report == null)
            {
                return NotFound();
            }

            _context.Reports.Remove(report);
            return Ok();
        }
        }
}
