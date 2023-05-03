using Exam_sch_system_WebApi.Helper;
using Exam_sch_system_WebApi.Models;
using Exam_sch_system_WebApi.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

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
            if (userobj == null)
            {
                return BadRequest(new
                {
                    errMessage= "User Is Null"
                });
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == userobj.Email);

            if(user == null) {
                return NotFound(new
                {
                    Message="User Not Found"
                });         
            }
            if (!PasswordHasher.VerifyPassword(userobj.Password, user.Password))
            {
                return BadRequest(new { errMessage = "Password Is Incorrect" });
            }
            user.Token = Createjwt(user);
            var newAccessToken = user.Token;
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenTime = DateTime.Now.AddDays(5);
            await _context.SaveChangesAsync();

            return Ok(new TokenApiDto()
            {
                AccessToken= newAccessToken,
                RefreshToken= newRefreshToken
            }) ;
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest(new { errMessage = "User Is Null" });
            }
            ///
            var emailexists = await CheckEmailExistAsync(user.Email);
            if (emailexists)
                return NotFound(new{ errMessage = "Email Already Exist!" });
            ///
/*            var pass = CheckPasswordStrength(user.Password);

            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { errMessage = pass.ToString() });
            }*/
            ///
            if (CheckIfAbove18Years(user.Birthday))
            {
                return BadRequest(new { errMessage = "Please Check Your Age!" });
            }

            ///
            user.Password = PasswordHasher.HashPassword(user.Password);
            user.Token = "";
            user.RefreshTokenTime= DateTime.Now;
            user.ResetPasswordExpiry=DateTime.Now.AddMinutes(5);
            user.RoleId = 2;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                errMessage = "User Registered!"
            });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(TokenApiDto tokenApiDto)
        {
            if(tokenApiDto == null)
            {
                return BadRequest(new {errMessage="Invalid Client Request"});
            }
            string accessToken=tokenApiDto.AccessToken;
            string refreshToken=tokenApiDto.RefreshToken;
            var principle = GetPrincipleFromExpiredToken(accessToken);
            var Email = principle.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == Email);
            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenTime <= DateTime.Now) 
                return BadRequest(new {errMessage="Invalid Request"});
            var newAccessToken = Createjwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _context.SaveChangesAsync();
            return Ok(new TokenApiDto()
            {
                AccessToken=newAccessToken,
                RefreshToken=newRefreshToken,
            });
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [HttpGet]
        public Boolean CheckIfAbove18Years(DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;
            if (age > 18)
            {
                return true;
            }

            return false;
        }
        ///////
        private Task<bool> CheckEmailExistAsync(string email) 
            =>_context.Users.AnyAsync(x => x.Email == email);
        ///////
        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb= new StringBuilder();
            if(password.Length<8)
                sb.Append("Minimum Password Length Should Be 8"+Environment.NewLine);

            if(!(Regex.IsMatch(password,"[a,z]") && Regex.IsMatch(password,"[A-Z]") && Regex.IsMatch(password,"[0-9]")))
                sb.Append("Password Should be Alphanumeric" + Environment.NewLine);

            if (!(Regex.IsMatch(password,"[<,>,@,#,$,%,^,&,*,=,.,:]")))
                sb.Append("Password Should Contain Special Char" + Environment.NewLine);
            return sb.ToString();
        }
        ///////
        private string Createjwt(User user)
        {
            var jwttokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("secretverysecret....");
            var Identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,user.RoleId.ToString()),
                new Claim(ClaimTypes.Email,$"{user.Email}"),
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject=Identity,
                Expires=DateTime.Now.AddDays(1),
                SigningCredentials=credentials
            };
            var Token = jwttokenHandler.CreateToken(tokenDescriptor);

            return jwttokenHandler.WriteToken(Token);
        }
        ///////
        private string CreateRefreshToken()
        {
            var tokenByte = RandomNumberGenerator.GetBytes(64);
            var refreshToken=Convert.ToBase64String(tokenByte);

            var tokenInUser=_context.Users
                .Any(a=>a.RefreshToken == refreshToken);
            if (tokenInUser)
            {
                return CreateRefreshToken();
            }
            return refreshToken;
        }
        ///////
        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var TokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey=new SymmetricSecurityKey(Encoding.ASCII.GetBytes("secretverysecret....")),
                ValidateLifetime = false,
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal=tokenHandler.ValidateToken(token,TokenValidationParameters,out securityToken);
            var jwtSecurityToken=securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))    {
                throw new SecurityTokenException("This Is Invalid Token");
            }
            return principal;
        }
    }
}
