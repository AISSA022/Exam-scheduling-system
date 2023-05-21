using Exam_sch_system_WebApi.Models;

namespace Exam_sch_system_WebApi.UtilityService
{
    public interface IEmailServices
    {
      void SendEmail(EmailModel emailModel);
    }
}
