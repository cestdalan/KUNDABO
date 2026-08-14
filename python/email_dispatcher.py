import json
import os
import smtplib
import ssl
import sys
from email.message import EmailMessage


def main():
    payload = json.load(sys.stdin)
    message = EmailMessage()
    message["From"] = os.environ["SMTP_FROM"]
    message["To"] = payload["recipient"]
    message["Subject"] = payload["subject"]
    message.set_content(payload["text"])

    host = os.environ["SMTP_HOST"]
    port = int(os.environ.get("SMTP_PORT", "587"))
    username = os.environ["SMTP_USERNAME"]
    password = os.environ["SMTP_PASSWORD"]

    if port == 465:
      with smtplib.SMTP_SSL(host, port, context=ssl.create_default_context()) as client:
        client.login(username, password)
        client.send_message(message)
    else:
      with smtplib.SMTP(host, port) as client:
        client.starttls(context=ssl.create_default_context())
        client.login(username, password)
        client.send_message(message)


if __name__ == "__main__":
    main()
