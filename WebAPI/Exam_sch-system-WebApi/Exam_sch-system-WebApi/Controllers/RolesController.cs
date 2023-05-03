using Exam_sch_system_WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;

        public RolesController(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetRole(int id) {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.RoleId);
        }
        [HttpPut("Edit-Role/{id}/{roleid}")]
        public async Task<ActionResult<User>> EditRole(int id,int roleid)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var role = await _context.Roles.FindAsync(roleid);
            if (role == null)
            {
                return BadRequest("Invalid role ID.");
            }

            user.RoleId = roleid;

            _context.Update(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
