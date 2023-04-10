using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Exam_sch_system_WebApi.Models;

public partial class User
{
    [Key]
    public int Id { get; set; }
    [Required(AllowEmptyStrings = true)]
    public string FirstName { get; set; } = null!;
    [Required(AllowEmptyStrings = true)]
    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;
    [Required(AllowEmptyStrings = true)]
    public string Gender { get; set; } = null!;
    [Required(AllowEmptyStrings = true)]
    public int PhoneNumber { get; set; }
    [Required(AllowEmptyStrings = true)]
    public DateTime Birthday { get; set; }

    public string Password { get; set; } = null!;
    [Required(AllowEmptyStrings = true)]

    public string PasswordSalt { get; set; } = null!;
    [Required(AllowEmptyStrings = true)]

    public bool Status { get; set; }
    [Required(AllowEmptyStrings = true)]

    public bool LoggedIn { get; set; }
    [Required(AllowEmptyStrings = true)]

    public int RoleId { get; set; }
}
