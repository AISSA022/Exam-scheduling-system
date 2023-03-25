using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Role
{
    public int RoleId { get; set; }

    public string Role1 { get; set; } = null!;

    public int UserId { get; set; }
}
