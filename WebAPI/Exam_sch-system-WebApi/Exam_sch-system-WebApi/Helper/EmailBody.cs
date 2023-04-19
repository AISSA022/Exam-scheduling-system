namespace Exam_sch_system_WebApi.Helper
{
    public static class EmailBody
    {
        public static string EmailStringBody(string email,string emailToken)
        {
            return $@"<html>
                    <head></head>
<body style=""margin:0;padding:0;font-family:Aria;,Helvetica,sans-serif;"">
<div style=""height:auto;background: linear-gradient(to bottom right , #0a66c2,#2275c8,white) no-repeat;width:400px;padding:30px"">
<div>
<h1>Reset Your Password</h1>
<hr>
<p>You're Receving This E-mail Because You Requested A Password Reset For Your Exam-Schedualing Account</p>
<p>Please Tap The Button Below To Choose A New Password</p>

<a href=""http://localhost:4200/reset?email={email}&code={emailToken}"" target=""_blank"" style="" background:#0a66c2;padding:10px;border:none;
color:white;border-radius:4px;display:block;margin:0 auto;width:50%;text-align:center;text-decoration:none"">Reset Password</a><br>

<p>Kind Regerd,<br><br>
Exam-Schedualing</p>
</div>
</div>
</div>
</body>
</html>
";
        }
    }
}
