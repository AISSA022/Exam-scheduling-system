using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Role
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public virtual ICollection<RolePermission> RolePermissions { get; } = new List<RolePermission>();

    public virtual ICollection<User> Users { get; } = new List<User>();
}
