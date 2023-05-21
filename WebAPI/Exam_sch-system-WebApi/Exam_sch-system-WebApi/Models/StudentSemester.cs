using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class StudentSemester
{
    public int StudentSemesterId { get; set; }

    public int StudentId { get; set; }

    public int SemesterCourseId { get; set; }

    public virtual SemesterCourse SemesterCourse { get; set; } = null!;

    public virtual User Student { get; set; } = null!;
}
