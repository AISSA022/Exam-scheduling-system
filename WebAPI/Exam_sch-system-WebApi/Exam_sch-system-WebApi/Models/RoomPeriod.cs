using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class RoomPeriod
{
    public int Id { get; set; }

    public int RoomId { get; set; }

    public int PeriodId { get; set; }

    public virtual Period Period { get; set; } = null!;

    public virtual Room Room { get; set; } = null!;
}
