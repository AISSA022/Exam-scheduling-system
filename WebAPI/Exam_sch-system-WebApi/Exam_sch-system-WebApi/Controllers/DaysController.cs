using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Exam_sch_system_WebApi.Models;
using Exam_sch_system_WebApi.Models.Dto;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaysController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;

        public DaysController(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        // GET: api/Days
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Day>>> GetDays()
        {
          if (_context.Days == null)
          {
              return NotFound();
          }
            return await _context.Days.ToListAsync();
        }

        // GET: api/Days/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Day>> GetDay(int id)
        {
          if (_context.Days == null)
          {
              return NotFound();
          }
            var day = await _context.Days.FindAsync(id);

            if (day == null)
            {
                return NotFound();
            }

            return day;
        }

        // PUT: api/Days/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDay(int id, Day day)
        {
            if (id != day.DayId)
            {
                return BadRequest();
            }
            var days=_context.Days.Where(d=>d.DayId==id).FirstOrDefault();
            if (days == null)
            {
                return NotFound();
            }
            days.DayTime = day.DayTime;
            _context.SaveChanges();
  

            return Ok();
        }

        // POST: api/Days
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Day>> PostDay(Day day)
        {
          if (_context.Days == null)
          {
              return Problem("Entity set 'ExamAttendanceSystemContext.Days'  is null.");
          }
            _context.Days.Add(day);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDay", new { id = day.DayId }, day);
        }

        // DELETE: api/Days/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDay(int id)
        {
            if (_context.Days == null)
            {
                return NotFound();
            }
            var day = await _context.Days.FindAsync(id);
            if (day == null)
            {
                return NotFound();
            }

            _context.Days.Remove(day);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DayExists(int id)
        {
            return (_context.Days?.Any(e => e.DayId == id)).GetValueOrDefault();
        }
        [HttpGet("GetAllDayTimes")]
        public ActionResult<IEnumerable<DayDTO>> GetAllDayTimes()
        {
            var dayTimes = _context.Days.Select(d => new DayDTO
            {
                DayId = d.DayId,
                DayTime = d.DayTime
            }).ToList();

            if (dayTimes == null || dayTimes.Count == 0)
            {
                return NotFound();
            }

            return dayTimes;
        }
    }
}
