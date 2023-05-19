using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Semester
{
    public int SemesterId { get; set; }

    public string SemesterName { get; set; } = null!;

    public virtual ICollection<SemesterCourse> SemesterCourses { get; } = new List<SemesterCourse>();
}
