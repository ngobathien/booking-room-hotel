import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
// backend/src/services/mail.service.ts
@Injectable()
export class MailService {
  // dịch vụ gửi mail

  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      //   service: 'gmail', // Hoặc dịch vụ email bạn sử dụng
      //   host: 'smtp.ethereal.email',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use true for port 465, false for port 587
      auth: {
        // user: 'cordell.gibson@ethereal.email',
        // pass: 'qvxXfsJGQnAWBqE6a7',

        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  //   hàm gửi mail
  async sendPasswordResetEmail(to: string, token: string) {
    const url_client = process.env.URL_CLIENT;
    const resetLink = `${url_client}/reset-password?token=${token}`;

    const mailOptions = {
      from: 'Auth-backend service',
      to: to,
      subject: 'Password Reset Request',

      html: `
        <p>You requested a password reset.</p>
        <p>
          <a href="${resetLink}">Đặt lại mật khẩu</a>
        </p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
