using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Permission
{
    public int PermissionId { get; set; }

    public string Name { get; set; } = null!;

    public string GroupName { get; set; } = null!;

    public virtual ICollection<RolePermission> RolePermissions { get; } = new List<RolePermission>();
}
