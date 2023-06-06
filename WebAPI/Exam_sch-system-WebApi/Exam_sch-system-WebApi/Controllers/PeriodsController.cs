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
    public class PeriodsController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;

        public PeriodsController(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        // GET: api/Periods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Period>>> GetPeriods()
        {
          if (_context.Periods == null)
          {
              return NotFound();
          }
            return await _context.Periods.ToListAsync();
        }

        // GET: api/Periods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Period>> GetPeriod(int id)
        {
          if (_context.Periods == null)
          {
              return NotFound();
          }
            var period = await _context.Periods.FindAsync(id);

            if (period == null)
            {
                return NotFound();
            }

            return period;
        }

        // PUT: api/Periods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPeriod(int id, Period period)
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PeriodExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var periodss = _context.Periods.FirstOrDefault(u => u.Id == id);
            ///////////////
            var oldroomid = periodss.RoomId;
            var periods = _context.RoomPeriods.FirstOrDefault(u => u.PeriodId == id && u.RoomId == oldroomid);
            if (periods == null)
            {
                return NotFound();
            }
            periods.RoomId = (int)period.RoomId;
            periods.PeriodId = id;
            _context.SaveChanges();
            // If the user doesn't exist, return a 404 Not Found
            if (periodss == null)
            {
                return NotFound();
            }

            // Update the user's properties with the new values
            periodss.PeriodName = period.PeriodName;
            periodss.DayId = period.DayId;
            periodss.TimeFrom = period.TimeFrom;
            periodss.TimeTo = period.TimeTo;
            periodss.RoomId = period.RoomId;

            // Save the changes to the database
            _context.SaveChanges();


            // Return a 204 No Content response
            return NoContent();
        }

        
        [HttpPost]
        public async Task<ActionResult<Period>> PostPeriod(Period period)
        {
          if (_context.Periods == null)
          {
              return Problem("Entity set 'ExamAttendanceSystemContext.Periods'  is null.");
          }

            _context.Periods.Add(period);
            await _context.SaveChangesAsync();

            var periodid = period.Id;
            var roomid = period.RoomId;
            var roomperoid = new RoomPeriod
            {
                Id=0,
                RoomId = (int)roomid,
                PeriodId = periodid,

            };
            _context.RoomPeriods.Add(roomperoid);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                periodid,
                roomid,
            });
        }

        // DELETE: api/Periods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePeriod(int id)
        {
            if (_context.Periods == null)
            {
                return NotFound();
            }
            var period = await _context.Periods.FindAsync(id);
            if (period == null)
            {
                return NotFound();
            }
            var periodid= period.Id;
            var  roomid=period.RoomId;
            var periodss = _context.RoomPeriods.FirstOrDefault(u => u.PeriodId == periodid && u.RoomId==roomid);
            if (periodss == null)
            {
                return NotFound();
            }
            _context.RoomPeriods.Remove(periodss);
            _context.Periods.Remove(period);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PeriodExists(int id)
        {
            return (_context.Periods?.Any(e => e.Id == id)).GetValueOrDefault();
        }
       

    }
}
