using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Report
{
    public int ReportId { get; set; }

    public string Description { get; set; } = null!;

    public string Type { get; set; } = null!;
}
