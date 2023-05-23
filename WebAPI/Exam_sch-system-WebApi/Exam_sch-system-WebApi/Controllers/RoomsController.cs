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
    public class RoomsController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;

        public RoomsController(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
          if (_context.Rooms == null)
          {
              return NotFound();
          }
            return await _context.Rooms.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
          if (_context.Rooms == null)
          {
              return NotFound();
          }
            var room = await _context.Rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }
 

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom(int id, [FromBody] Room room)
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var roomss = _context.Rooms.FirstOrDefault(u => u.RoomId == id);

            // If the user doesn't exist, return a 404 Not Found
            if (roomss == null)
            {
                return NotFound();
            }

            // Update the user's properties with the new values
            roomss.RoomName = room.RoomName;
            roomss.SeatNumber = room.SeatNumber;
            roomss.Columns= room.Columns;
            roomss.Row = room.Row;
            roomss.Building=room.Building;

            // Save the changes to the database
            _context.SaveChanges();

            // Return a 204 No Content response
            return NoContent();
        }
        
        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
          if (_context.Rooms == null)
          {
              return Problem("Entity set 'ExamAttendanceSystemContext.Rooms'  is null.");
          }
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoom", new { id = room.RoomId }, room);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            if (_context.Rooms == null)
            {
                return NotFound();
            }
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("GetRoomName/{name}")]
        public async Task<IActionResult> GetRoomName(string name)
        {
            if (_context.Rooms == null)
            {
                return NotFound();
            }
            var room =  _context.Rooms.Where(r=>r.RoomName== name).FirstOrDefault();
            if (room == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                roomName=room.RoomId
            });
        }
        private bool RoomExists(int id)
        {
            return (_context.Rooms?.Any(e => e.RoomId == id)).GetValueOrDefault();
        }
    }
}
