using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Course
{
    public int CourseId { get; set; }

    public string CourseName { get; set; } = null!;

    public string CourseCode { get; set; } = null!;

    public string Section { get; set; } = null!;

    public string Instructor { get; set; } = null!;

    public virtual ICollection<StudentCourse> StudentCourses { get; } = new List<StudentCourse>();
}
