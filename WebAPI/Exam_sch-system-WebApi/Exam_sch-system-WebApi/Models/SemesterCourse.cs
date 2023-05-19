using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class SemesterCourse
{
    public int SemesterCourseId { get; set; }

    public int CourseId { get; set; }

    public int StudentId { get; set; }

    public int SemesterId { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual Semester Semester { get; set; } = null!;

    public virtual User Student { get; set; } = null!;
}
