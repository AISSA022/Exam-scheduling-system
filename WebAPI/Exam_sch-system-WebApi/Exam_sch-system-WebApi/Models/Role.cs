using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Role
{
    public int Id { get; set; }

    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public int UserId { get; set; }

    public virtual ICollection<RolePermission> RolePermissions { get; } = new List<RolePermission>();

    public virtual User User { get; set; } = null!;
}
