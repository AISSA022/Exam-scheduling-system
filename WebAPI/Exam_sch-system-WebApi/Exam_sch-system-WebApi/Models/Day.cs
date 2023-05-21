using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Day
{
    public int DayId { get; set; }

    public DateTime DayTime { get; set; }

    public virtual ICollection<Period> Periods { get; } = new List<Period>();
}
