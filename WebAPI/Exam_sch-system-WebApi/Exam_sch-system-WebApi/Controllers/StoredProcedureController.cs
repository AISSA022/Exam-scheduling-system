using Exam_sch_system_WebApi.Models;
using Exam_sch_system_WebApi.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.Data;
using static System.Collections.Specialized.BitVector32;

namespace Exam_sch_system_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoredProcedureController : ControllerBase
    {
        private readonly ExamAttendanceSystemContext _context;
        private readonly IConfiguration _configuration;
        public StoredProcedureController(ExamAttendanceSystemContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }





            [HttpGet("GetStudentsReferToSemesterCourses/{semesterId}")]
            public ActionResult<IEnumerable<SemesterCoursesRoom>> GetStudentsReferToSemesterCourses(int semesterId)
            {
                List<SemesterCoursesRoom> semesterCourses = new List<SemesterCoursesRoom>();

                using (SqlConnection connection = new SqlConnection("Server=(localdb)\\MSSQLLocalDB; Database=Exam-Attendance-system;Trusted_Connection=True;"))
                {
                    using (SqlCommand command = new SqlCommand("GetStudentsReferToSemesterCourses", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@SemesterId", semesterId);

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                            
                                var courseId = reader.GetInt32(reader.GetOrdinal("CourseId"));
                                var courseName = reader.GetString(reader.GetOrdinal("CourseName"));
                                var courseCode = reader.GetString(reader.GetOrdinal("CourseCode"));
                                var section = reader.GetString(reader.GetOrdinal("Section"));
                                var instructor = reader.GetString(reader.GetOrdinal("Instructor"));
                                var roomName = reader.IsDBNull(reader.GetOrdinal("RoomName")) ? null : reader.GetString(reader.GetOrdinal("RoomName"));
                                var periodName = reader.IsDBNull(reader.GetOrdinal("PeriodName")) ? null : reader.GetString(reader.GetOrdinal("PeriodName")); ;
                                var semesterCourseId = reader.IsDBNull(reader.GetOrdinal("SemesterCourseId")) ? null : (int?)reader.GetInt32(reader.GetOrdinal("SemesterCourseId"));
                            // Retrieve other relevant columns as needed

                            var semesterCourse = new SemesterCoursesRoom
                                {
                                    CourseId = courseId,
                                    CourseName = courseName,
                                    CourseCode = courseCode,
                                    Section = section,
                                    Instructor = instructor,
                                    RoomName = roomName ,
                                    PeriodName = periodName ,
                                    SemesterCourseId = (int)semesterCourseId 
                                };

                                semesterCourses.Add(semesterCourse);
                            }
                        }
                    }
                }
            
                return semesterCourses;
            }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [HttpGet("GetRoomPeriod")]
        public ActionResult<IEnumerable<RoomPeriodDTO>> GetRoomPeriod()
        {
            List<RoomPeriodDTO> RoomPeriodd = new List<RoomPeriodDTO>();

            using (SqlConnection connection = new SqlConnection("Server=(localdb)\\MSSQLLocalDB; Database=Exam-Attendance-system;Trusted_Connection=True;"))
            {
                using (SqlCommand command = new SqlCommand("GetRoomPeriod", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var periodId = reader.GetInt32(reader.GetOrdinal("PeriodId"));
                            var periodName = reader.GetString(reader.GetOrdinal("PeriodName"));
                            var dayTime = reader.GetDateTime(reader.GetOrdinal("DayTime"));
                            var timeFrom = reader.GetString(reader.GetOrdinal("TimeFrom"));
                            var timeTo = reader.GetString(reader.GetOrdinal("TimeTo"));
                            var roomName = reader.GetString(reader.GetOrdinal("RoomName"));


                            var roompp = new RoomPeriodDTO
                            {
                               PeriodId=periodId,
                               PeriodName=periodName,
                               TimeFrom=timeFrom,
                               TimeTo=timeTo,
                               RoomName=roomName,
                            };
                            RoomPeriodd.Add(roompp);
                        }
                    }
                }
            }

            return RoomPeriodd;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpGet("CheckTimeConflict")]
        public async Task<ActionResult<int>> CheckTimeConflict(int semesterId, int semesterCourseId)
        {
            try
            {
                int conflictStatus = 0;
                SqlParameter conflictStatusParameter = new SqlParameter("@ConflictStatus", SqlDbType.Bit);
                conflictStatusParameter.Direction = ParameterDirection.Output;

                using (SqlConnection connection = new SqlConnection("Server=(localdb)\\MSSQLLocalDB; Database=Exam-Attendance-system;Trusted_Connection=True;"))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("CheckConflict2", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@semesterid", semesterId);
                        command.Parameters.AddWithValue("@semestercourseid", semesterCourseId);
                        command.Parameters.Add(conflictStatusParameter);

                        await command.ExecuteNonQueryAsync();

                        conflictStatus = Convert.ToInt32(conflictStatusParameter.Value);
                    }
                }
                return Ok(conflictStatus);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////

        [HttpGet("StudentCheckConflict")]
        public IActionResult StudentCheckConflict(int semesterId, int semesterCourseId, int studentId)
        {
            int conflictStatus = 0;

            using (SqlConnection connection = new SqlConnection("Server=(localdb)\\MSSQLLocalDB; Database=Exam-Attendance-system;Trusted_Connection=True;"))
            {
                SqlCommand command = new SqlCommand("StudentCheckConflict", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@semesterid", semesterId);
                command.Parameters.AddWithValue("@semestercourseid", semesterCourseId);
                command.Parameters.AddWithValue("@StudentId", studentId);
                command.Parameters.Add("@ConflictStatus", SqlDbType.Int).Direction = ParameterDirection.Output;

                connection.Open();
                command.ExecuteNonQuery();

                conflictStatus = Convert.ToInt32(command.Parameters["@ConflictStatus"].Value);
            }

            return Ok(conflictStatus);
        }

    }

}
