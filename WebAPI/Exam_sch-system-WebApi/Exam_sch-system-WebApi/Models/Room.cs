using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Room
{
    public int RoomId { get; set; }

    public string RoomName { get; set; } = null!;

    public int SeatNumber { get; set; }

    public int Columns { get; set; }

    public int Row { get; set; }

    public string Building { get; set; } = null!;

    public virtual ICollection<RoomPeriod> RoomPeriods { get; } = new List<RoomPeriod>();
}
