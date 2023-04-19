using Exam_sch_system_WebApi.Models;
using MailKit.Net.Smtp;
using MimeKit;
using System;

namespace Exam_sch_system_WebApi.UtilityService
{
    public class EmailService : IEmailServices
    {
        private readonly IConfiguration _config ;
        public EmailService(IConfiguration configuration) 
        {
            _config = configuration;
        }
        public void SendEmail(EmailModel emailModel)
        {
            var emailMessage = new MimeMessage();
            var from = _config["EmailSettings:From"];
            emailMessage.From.Add(new MailboxAddress("Exam Schedualing", from));
            emailMessage.To.Add(new MailboxAddress(emailModel.To, emailModel.To));
            emailMessage.Subject=emailModel.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text=string.Format(emailModel.Content)
            };

            using(var client =new SmtpClient())
            {
                try
                {
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    client.Connect(_config["EmailSettings:SmtpServer"], 465, true);
                    client.Authenticate(_config["EmailSettings:From"], _config["EmailSettings:Password"]);
                    client.Send(emailMessage);
                }
                catch (Exception)
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}
