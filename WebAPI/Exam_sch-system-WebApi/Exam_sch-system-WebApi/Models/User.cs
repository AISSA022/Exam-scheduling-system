using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models.User;

public partial class User
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public int PhoneNumber { get; set; }

    public DateTime Birthday { get; set; }

    public byte[] Password { get; set; } = null!;

    public byte[] PasswordSalt { get; set; } = null!;

    public bool Status { get; set; }

    public bool LoggedIn { get; set; }

    public int RoleId { get; set; }
}
