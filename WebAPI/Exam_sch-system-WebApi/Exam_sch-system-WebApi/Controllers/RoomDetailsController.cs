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
    public class RoomDetailsController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;

        public RoomDetailsController(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        // GET: api/RoomDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomDetail>>> GetRoomDetails()
        {
          if (_context.RoomDetails == null)
          {
              return NotFound();
          }
            return await _context.RoomDetails.ToListAsync();
        }

        // GET: api/RoomDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDetail>> GetRoomDetail(int id)
        {
          if (_context.RoomDetails == null)
          {
              return NotFound();
          }
            var roomDetail = await _context.RoomDetails.FindAsync(id);

            if (roomDetail == null)
            {
                return NotFound();
            }

            return roomDetail;
        }


        [HttpPost("AddRoomDetails")]
        public IActionResult AddRoomDetails([FromBody] List<RoomDetailDTO> roomDetails, int roomId)
        {
            try
            {
                // Delete existing room details for the given roomId
                var existingRoomDetails = _context.RoomDetails.Where(rd => rd.RoomId == roomId);
                _context.RoomDetails.RemoveRange(existingRoomDetails);

                foreach (var detail in roomDetails)
                {
                    // Create a new RoomDetail object
                    var roomDetail = new RoomDetail
                    {
                        ColumnName = detail.ColumnName,
                        RowCapacity = detail.RowCapacity,
                        RoomId = roomId
                    };

                    // Add the new RoomDetail to the database
                    _context.RoomDetails.Add(roomDetail);
                }

                // Save changes to the database
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                // Handle any errors that occur during the process
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpGet("GetRoomDetailsByRoomId")]
        public IActionResult GetRoomDetailsByRoomId(int roomId)
        {
            try
            {
                // Retrieve the room details for the specified roomId
                var roomDetails = _context.RoomDetails
                    .Where(rd => rd.RoomId == roomId)
                    .Select(rd => new
                    {
                        rd.ColumnName,
                        rd.RowCapacity
                    })
                    .ToList();

                return Ok(roomDetails);
            }
            catch (Exception ex)
            {
                // Handle any errors that occur during the process
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        // POST: api/RoomDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RoomDetail>> PostRoomDetail(RoomDetail roomDetail)
        {
          if (_context.RoomDetails == null)
          {
              return Problem("Entity set 'ExamAttendanceSystemContext.RoomDetails'  is null.");
          }
            _context.RoomDetails.Add(roomDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RoomDetailExists(roomDetail.RoomDetailsId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRoomDetail", new { id = roomDetail.RoomDetailsId }, roomDetail);
        }

        // DELETE: api/RoomDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomDetail(int id)
        {
            if (_context.RoomDetails == null)
            {
                return NotFound();
            }
            var roomDetail = await _context.RoomDetails.FindAsync(id);
            if (roomDetail == null)
            {
                return NotFound();
            }

            _context.RoomDetails.Remove(roomDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoomDetailExists(int id)
        {
            return (_context.RoomDetails?.Any(e => e.RoomDetailsId == id)).GetValueOrDefault();
        }
    }
}
