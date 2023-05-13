using Exam_sch_system_WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoredProcedureController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;

        public StoredProcedureController(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        [HttpGet("GetRoomName")]
        public IActionResult GetRoomNameByPeriodId()
        {
            var rooms = _context.Rooms.FromSqlInterpolated($"EXEC GetRoomNameByPeriodId").ToList();
            return Ok(rooms);
        }

    }
}
