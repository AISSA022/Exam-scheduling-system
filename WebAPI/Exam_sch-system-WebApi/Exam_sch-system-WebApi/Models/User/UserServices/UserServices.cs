using System.Security.Claims;

namespace Exam_sch_system_WebApi.Models.User.UserServices
{
    ////part of an authentication and authorization system in a web 
    ///application to retrieve and use the current user's identity
    public class UserService : IUserServices
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            }
            return result;
        }
    }
}
