using System;
namespace Exam_sch_system_WebApi.Models
{
    public class EmailModel
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        public EmailModel(string to,string subject,string conent) 
        { 
            To = to;
            Subject = subject;  
            Content = conent;
        }
    }
}
