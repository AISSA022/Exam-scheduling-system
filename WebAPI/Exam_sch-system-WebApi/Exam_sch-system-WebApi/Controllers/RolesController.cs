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

/*        [HttpGet("{id}")]
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
        }*/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {
            if (_context.Roles == null)
            {
                return NotFound();
            }
            return await _context.Roles.ToListAsync();
        }
 /*       [HttpPut("Edit-Role/{userid}/{roleid}")]
        public async Task<ActionResult<User>> EditRole(int userid,int roleid)
        {
            var user = _context.Users.FirstOrDefault(u=>u.Id==userid);
            if(user == null)
            {
                return NotFound();
            }
            user.RoleId= roleid;
            _context.SaveChanges();
            /////////////////
            var updaterole =_context.Roles.FirstOrDefault(u=>u.UserId==userid);
            if (updaterole == null)
            {
                return NotFound();
            }
            var rolename = "";
            if (roleid == 1)
            {
                rolename = "Admin";
            }
            if (roleid == 2)
            {
                rolename = "Emp";
            }
            if (roleid == 3)
            {
                rolename = "User";
            }
            updaterole.RoleId = roleid;
            updaterole.RoleName=rolename;
            _context.SaveChanges();
            return Ok();
        }*/
        ////////////////////////////////////////////////////////////////
        [HttpGet("get-Permissions/{roleid}")]
        public async Task<ActionResult<IEnumerable<Permission>>> getPermissions(int roleid)
        {
            var permissions = await _context.RolePermissions.Where(p => p.RoleId == roleid).ToListAsync();
            if (!permissions.Any())
            {
                return Ok(new
                {
                    errMessage="No Role Found"
                });
            }
            return Ok(new
            {
                permissions
            });
                  
        }
        ///////////////////////////////////////////////

        /* [HttpPost("Edit-RolePermission/{roleId}")]
         public async Task<ActionResult> AddPermissionToRole(int roleId, int[] permissionIds)
         {
             var role = await _context.Roles.FindAsync(roleId);
             if (role == null)
             {
                 return NotFound();
             }

             foreach (var permissionId in permissionIds)
             {
                 var rolePermission = await _context.RolePermissions
                     .FirstOrDefaultAsync(rp => rp.RoleId == roleId && rp.PermissionId == permissionId);

                 if (rolePermission == null)
                 {
                     var newRolePermission = new RolePermission { RoleId = roleId, PermissionId = permissionId };
                     _context.RolePermissions.Add(newRolePermission);
                 }
             }


             await _context.SaveChangesAsync();  

             return NoContent();
         }*/
        [HttpPost("Edit-RolePermission/{id}")]
        public IActionResult AddPermissionsToRole(int id, int[] permissionIds)
        {
            var role = _context.Roles.Include(r => r.RolePermissions).FirstOrDefault(r => r.RoleId == id);
            if (role == null)
            {
                return NotFound();
            }

            // Get a list of existing permission ids
            var existingPermissionIds = role.RolePermissions.Select(rp => rp.PermissionId).ToList();

            // Add new permissions
            foreach (var permissionId in permissionIds)
            {
                // If permission is not already assigned to the role, add it
                if (!existingPermissionIds.Contains(permissionId))
                {
                    var permission = _context.Permissions.Find(permissionId);
                    if (permission != null)
                    {
                        var newRolePermission = new RolePermission { RoleId = id, PermissionId = permissionId, Permission = permission, Role = role };
                        _context.RolePermissions.Add(newRolePermission);
                    }
                }
            }

            // Remove old permissions that are not in the new list
            foreach (var existingPermissionId in existingPermissionIds)
            {
                // If permission is not in the new list, remove it
                if (!permissionIds.Contains(existingPermissionId))
                {
                    var rolePermissionToRemove = role.RolePermissions.FirstOrDefault(rp => rp.PermissionId == existingPermissionId);
                    if (rolePermissionToRemove != null)
                    {
                        _context.RolePermissions.Remove(rolePermissionToRemove);
                    }
                }
            }

            _context.SaveChanges();

            return Ok();
        }
        //////////////////////////////////////////
        [HttpPost("CreateRole")]
        public IActionResult CreateRole(string roleName)
        {
            var Role = new Role
            {
                RoleName=roleName
            };
            _context.Roles.Add(Role);
            _context.SaveChanges();
            return Ok();
        }
        ////////////////////////////////////////////////
        [HttpDelete("DeleteRole/{roleId}")]
        public IActionResult DeleteRole(int roleId)
        {
            try
            {
                var role = _context.Roles.Include(r => r.RolePermissions).FirstOrDefault(r => r.RoleId == roleId);

                if (role == null)
                {
                    return NotFound(); 
                }

                foreach (var permission in role.RolePermissions.ToList())
                {
                    _context.RolePermissions.Remove(permission);
                }

                _context.Roles.Remove(role);
                _context.SaveChanges();

                return Ok(); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
