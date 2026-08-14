import { spawn } from "node:child_process";

type EmailPayload = { recipient: string; subject: string; text: string };

export async function sendEmailWhenConfigured(payload: EmailPayload) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD || !process.env.SMTP_FROM) {
    return { dispatched: false, reason: "SMTP credentials are not configured" };
  }
  return new Promise<{ dispatched: boolean; reason?: string }>((resolve) => {
    const child = spawn("python3", ["python/email_dispatcher.py"], {
      env: process.env,
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("close", (code) => resolve(code === 0 ? { dispatched: true } : { dispatched: false, reason: stderr || "Email process failed" }));
    child.stdin.write(JSON.stringify(payload));
    child.stdin.end();
  });
}
