﻿using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class User
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public int PhoneNumber { get; set; }

    public DateTime Birthday { get; set; }

    public string Password { get; set; } = null!;

    public string? Token { get; set; }

    public bool Status { get; set; }

    public bool LoggedIn { get; set; }

    public int? RoleId { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime RefreshTokenTime { get; set; }

    public string? ResetPasswordToken { get; set; }

    public DateTime ResetPasswordExpiry { get; set; }

    public byte[]? Image { get; set; }

    public virtual Role? Role { get; set; }

    public virtual ICollection<StudentSemester> StudentSemesters { get; } = new List<StudentSemester>();
}
