using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Period
{
    public int Id { get; set; }

    public string PeriodName { get; set; } = null!;

    public int DayId { get; set; }

    public string TimeFrom { get; set; } = null!;

    public string TimeTo { get; set; } = null!;

    public int? RoomId { get; set; }

    public virtual Day Day { get; set; } = null!;

    public virtual ICollection<RoomPeriod> RoomPeriods { get; } = new List<RoomPeriod>();
}
