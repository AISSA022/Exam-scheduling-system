using System;
using System.Collections.Generic;

namespace Exam_sch_system_WebApi.Models;

public partial class RoomDetail
{
    public int RoomDetailsId { get; set; }

    public string ColumnName { get; set; } = null!;

    public int RowCapacity { get; set; }

    public int? RoomId { get; set; }

    public virtual ICollection<Room> Rooms { get; } = new List<Room>();
}
