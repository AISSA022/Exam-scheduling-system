using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Exam_sch_system_WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using Exam_sch_system_WebApi.Helper;
using Exam_sch_system_WebApi.UtilityService;
using Exam_sch_system_WebApi.Models.Dto;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailServices _emailService;
        public UsersController(ExamAttendanceSystemContext context, IConfiguration configuration, IEmailServices emailService)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, [FromBody] User updatedUser)
        {
            /*if (id != user.Id)
            {
                return BadRequest();
            }*/

            /*_context.Entry(user).State = EntityState.Modified;*/
            /*            var userToUpdate = await _context.Users.FindAsync(id);
            */
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            // If the user doesn't exist, return a 404 Not Found
            if (user == null)
            {
                return NotFound();
            }

            // Update the user's properties with the new values
            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.Email = updatedUser.Email;
            user.Gender = updatedUser.Gender;
            user.PhoneNumber = updatedUser.PhoneNumber;
            user.Birthday = updatedUser.Birthday;
            user.Password = updatedUser.Password;
            user.Token = updatedUser.Token;
            user.Status = updatedUser.Status;
            user.LoggedIn = updatedUser.LoggedIn;
            user.RoleId = updatedUser.RoleId;
            _context.SaveChanges();
            /*
                        var updaterole =_context.Roles.FirstOrDefault(u => u.UserId == id);
                        if (updaterole != null)
                        {
                            return NotFound();
                        }
                        updaterole.RoleId=updatedUser.RoleId;*/
            var updaterole = _context.Roles.FirstOrDefault(u => u.UserId == id);
            if (updaterole == null)
            {
                return NotFound();
            }
            var rolename = "";
            if (updatedUser.RoleId == 1)
            {
                rolename = "Admin";
            }
            if (updatedUser.RoleId == 2)
            {
                rolename = "Emp";
            }
            if (updatedUser.RoleId == 3)
            {
                rolename = "User";
            }
            updaterole.RoleId = updatedUser.RoleId;
            updaterole.RoleName = rolename;
            _context.SaveChanges();
            // Save the changes to the database
            _context.SaveChanges();

            // Return a 204 No Content response
            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'ExamAttendanceSystemContext.Users'  is null.");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);

        }
        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var role=_context.Roles.Where(u=>u.UserId == id).FirstOrDefault();
            if (role == null)
            {
                return NotFound();
            }
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("getid/{email}")]
        public async Task<IActionResult> GetUserIdByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return BadRequest(new { errmessage = "Email not found." });
            }
            return Ok(new { id = user.Id });
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        /////////////////////////////////////
        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Email == email);
            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    errMessage = "Email Doesn't Exist"
                });
            }
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            user.ResetPasswordToken = emailToken;
            user.ResetPasswordExpiry = DateTime.Now.AddMinutes(15);
            string from = _configuration["EmailSettings:From"];
            var emailModel = new EmailModel(email, "Reset Password!!", EmailBody.EmailStringBody(email, emailToken));


            _emailService.SendEmail(emailModel);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(new
            {
                StatusCode = 200,
                errMessage = "Email Sent"
            });
        }
        [HttpPost("send-reset-pass/{email}")]
        public async Task<IActionResult> resetpass(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Email == email);
            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    errMessage = "Email Doesn't Exist"
                });
            }
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailtoken = Convert.ToBase64String(tokenBytes);
            user.ResetPasswordToken = emailtoken;
            user.ResetPasswordExpiry = DateTime.Now.AddMinutes(15);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(new
            {
                tokenBytes = tokenBytes,
                StatusCode = 200,
                errMessage = "pass Sent"
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);
            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    errMessage = "Email Doesn't Exist"
                });
            }
            var tokenCode = user.ResetPasswordToken;
            DateTime emailTokenExpiry = user.ResetPasswordExpiry;
            if (tokenCode != resetPasswordDto.EmailToken || emailTokenExpiry < DateTime.Now)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    errMessage = "Invalid Reset Link"
                });
            }
            user.Password = PasswordHasher.HashPassword(resetPasswordDto.NewPassword);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                StatusCode = 200,
                errMessage = "Password Reset Successfully!"
            });
        }
        [HttpGet("get-phonenumber/{userid}")]
        public async Task<IActionResult> getphonenumber(int userid)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Id == userid);

            return Ok(new
            {
                phone = user.PhoneNumber
            });
        }
        [HttpGet("getuserinfo/{userid}")]
        public async Task<IActionResult> getuserinfo(int userid)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Id == userid);

            return Ok(new
            {
                firstname = user.FirstName,
                lastname = user.LastName,
                email = user.Email,
                phone = user.PhoneNumber,
                image=user.Image
            });
        }
       

        [HttpPost("addimage/{userId}")]
        public async Task<IActionResult> UploadUserImage(int userId, IFormFile file)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("Invalid file.");
            }

            byte[] imageData = null;
            using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)file.Length);
            }

            user.Image = imageData;

            _context.Update(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("updateprofile/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpGet("GetStudents")]
        public async Task<ActionResult<IEnumerable<User>>> GetStudents()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.Where(u=>u.RoleId==3).ToListAsync();
        }
        /**/
    }


}
