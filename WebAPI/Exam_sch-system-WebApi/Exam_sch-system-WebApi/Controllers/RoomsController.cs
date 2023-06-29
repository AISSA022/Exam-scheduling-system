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


        /*        [HttpPut("EditRoom")]
                public IActionResult EditRoom(int roomId, [FromBody] RoomDTO updatedRoom)
                {
                    try
                    {
                        // Retrieve the existing room from the database
                        var room = _context.Rooms.FirstOrDefault(r => r.RoomId == roomId);

                        if (room == null)
                        {
                            return NotFound(); // Room not found
                        }

                        // Update the room properties with the new values
                        room.RoomName = updatedRoom.RoomName;
                        room.SeatNumber = updatedRoom.SeatNumber;
                        room.Columns = updatedRoom.Columns;
                        room.Building = updatedRoom.Building;
                        // Save changes to the database
                        _context.SaveChanges();

                        return Ok(); // Room updated successfully
                    }
                    catch (Exception ex)
                    {
                        // Handle any errors that occur during the process
                        return StatusCode(500, $"An error occurred: {ex.Message}");
                    }
                }
        */
        [HttpPut("EditRoom")]
        public IActionResult EditRoom(int roomId, [FromBody] RoomDTO updatedRoom)
        {
            try
            {
                // Retrieve the existing room from the database
                var room = _context.Rooms.FirstOrDefault(r => r.RoomId == roomId);

                if (room == null)
                {
                    return NotFound(); // Room not found
                }

                // Update the room properties with the new values
                room.RoomName = updatedRoom.RoomName;
                room.SeatNumber = updatedRoom.SeatNumber;
                room.Columns = updatedRoom.Columns;
                room.Building = updatedRoom.Building;

                // If the room has a RoomDetailsId
                if (room.RoomDetailsId.HasValue)
                {
                    // Retrieve the existing room details from the database
                    var roomDetails = _context.RoomDetails.FirstOrDefault(rd => rd.RoomDetailsId == room.RoomDetailsId);

                    if (roomDetails != null)
                    {
                        // Update the room details properties with the new values
                        roomDetails.ColumnName = updatedRoom.RoomDetails.ColumnName;
                        roomDetails.RowCapacity = updatedRoom.RoomDetails.RowCapacity;
                    }
                }
                else
                {
                    // Create a new room details object
                    var roomDetails = new RoomDetail
                    {
                        ColumnName = updatedRoom.RoomDetails.ColumnName,
                        RowCapacity = updatedRoom.RoomDetails.RowCapacity
                    };

                    // Associate the room details with the room
                    room.RoomDetails = roomDetails;
                }

                // Save changes to the database
                _context.SaveChanges();

                return Ok(); // Room updated successfully
            }
            catch (Exception ex)
            {
                // Handle any errors that occur during the process
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
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
