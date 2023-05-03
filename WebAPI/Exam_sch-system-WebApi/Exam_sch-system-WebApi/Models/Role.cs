using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Role
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public int UserId { get; set; }

    public virtual ICollection<Permission> Permissions { get; } = new List<Permission>();

    public virtual User User { get; set; } = null!;
}
