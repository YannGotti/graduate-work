import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage

from project import settings

class SMTPServer:
    
    def __init__(self):
        self.smtp_connection = None
        self.connection_open = self._open_connection()

    def _open_connection(self) -> bool:
        try:
            self.smtp_connection = smtplib.SMTP_SSL(settings.SMTP_SERVER, settings.SMTP_PORT)
            self.smtp_connection.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)

            return True
        except Exception as e:
            return False

    def send_message(self, subject, message, to_addr, html_content=None) -> bool:
        if not self.connection_open:
            return False
        
        try:
            msg = MIMEMultipart()
            msg['From'] = settings.SMTP_USERNAME
            msg['To'] = to_addr
            msg['Subject'] = subject

            if html_content:
                msg.attach(MIMEText(html_content, 'html'))
            else:
                msg.attach(MIMEText(message, 'html'))

            self.smtp_connection.sendmail(settings.SMTP_USERNAME, to_addr, msg.as_string())

            print('Message send to %s' % to_addr)

            return True
        
        except Exception as e:
            print(e)
            return False