using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class Room
{
    public int RoomId { get; set; }

    public string RoomName { get; set; } = null!;

    public int SeatNumber { get; set; }

    public int Columns { get; set; }

    public string Building { get; set; } = null!;

    public int? RoomDetailsId { get; set; }

    public virtual RoomDetail? RoomDetails { get; set; }

    public virtual ICollection<RoomPeriod> RoomPeriods { get; } = new List<RoomPeriod>();
}
