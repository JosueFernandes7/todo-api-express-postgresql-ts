import nodemailer from "nodemailer";
import { env } from "../config/env.js";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationLink = `${env.BASE_URL}/api/users/verify-email?token=${token}`;
    
    const mailOptions = {
      from: env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Please verify your email by clicking on the following link: ${verificationLink}`,
      html: `<p>Please verify your email by clicking on the link below:</p><a href="${verificationLink}">Verify Email</a>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export { EmailService };
