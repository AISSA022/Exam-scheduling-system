namespace Exam_sch_system_WebApi.Models.Dto
{
    public record ResetPasswordDto
    {
        public string Email { get; set; }
        public string EmailToken { get; set; }

        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
