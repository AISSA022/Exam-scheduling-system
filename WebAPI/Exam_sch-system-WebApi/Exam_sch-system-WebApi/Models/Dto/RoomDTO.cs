namespace Exam_sch_system_WebApi.Models.Dto
{
    public class RoomDTO
    {
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public int SeatNumber { get; set; }
        public int Columns { get; set; }
        public string Building { get; set; }
        public RoomDetailDTO RoomDetails { get; set; }
    }
    public class RoomDetailDTO
    {
        public int RoomDetailsId { get; set; }
        public string ColumnName { get; set; }
        public int RowCapacity { get; set; }
    }
}
