using Exam_sch_system_WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        ///Defining User
        /**//*public static User user = new User();
*/        /*private readonly IUserService _userService;*/

        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
/*            userService = userService ;
*/        }


        /*
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            CreatePasswordHash(request.Password, out byte[] PasswordHash, out byte[] PasswordSalt);
            user.Id = request.Id;
            user.Password = PasswordHash;
            user.PasswordSalt = PasswordSalt;
            return Ok(user);
        }
        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            if (user.Id != request.Id)
            {
                return BadRequest("User Not Found");
            }
            if (!VerifyPassword(request.Password, user.Password, user.PasswordSalt))
            {
                return BadRequest("Wrong Password");
            }
            string token = CreateToken(user);
            return Ok(token);
        }


        private void CreatePasswordHash(string password, out byte[] PasswordHash, out byte[] PasswordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                PasswordSalt = hmac.Key;
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {

            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        *//*private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
             {
                 new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
             };
            ///Download Microsoft.IdentityModels.Tokens
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                
                _configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
*//*
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.Id.ToString() ),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }*/
        /*   [HttpGet, Authorize]
   public ActionResult<string> GetMe()
   {
       var userName = _userService.GetMyName();
       return Ok(userName);
   }*/
    }
}
