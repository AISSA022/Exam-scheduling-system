using Exam_sch_system_WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;

        public AuthenticationController(ExamAttendanceSystemContext context)
        {
            _context = context;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userobj)
        {
           /* userobj.Gender = userobj.Gender ?? "";
            userobj.LastName = userobj.LastName ?? "";
            userobj.FirstName = userobj.FirstName ?? "";
            userobj.PasswordSalt = userobj.PasswordSalt ?? "";
*/
            if (userobj == null)
            {
                return BadRequest("User Is Null");
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == userobj.Email && x.Password == userobj.Password);
            if(user == null) {
                return NotFound(new
                {
                    Message="User Not Found"
                });         
            }
            return Ok(new
            {
                Message = "Login Success!"
            }) ;
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User Is Null");
            }
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!"
            });
        }
    }
}
