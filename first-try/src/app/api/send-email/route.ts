import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { to, subject, content } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        ciphers: "SSLv3",
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: subject || "新消息",
      text: content,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("发送邮件失败:", error);
    return NextResponse.json({ error: "发送失败" }, { status: 500 });
  }
}
