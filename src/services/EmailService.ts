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
    const verificationLink = `${env.BASE_URL}/api/users/verify?token=${token}`;

    const htmlContent =
      "<!DOCTYPE html>" +
      '<html lang="en">' +
      "<head>" +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      "<title>Email Verification</title>" +
      "<style>" +
      '@import url("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css");' +
      "</style>" +
      "</head>" +
      '<body class="bg-gray-100 py-10">' +
      '<div class="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">' +
      '<div class="text-center bg-blue-600 text-white py-4">' +
      '<h2 class="text-2xl font-bold">TODO API</h2>' +
      '<p class="text-sm">Email Verification</p>' +
      "</div>" +
      '<div class="p-6">' +
      '<p class="text-gray-700 text-sm">Hello,</p>' +
      '<p class="text-gray-700 text-sm mt-2">Thank you for signing up. Please verify your email by clicking the button below:</p>' +
      '<div class="text-center my-6">' +
      '<a href="' +
      verificationLink +
      '" ' +
      'class="inline-block px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">' +
      "Verify Email</a>" +
      "</div>" +
      '<p class="text-gray-500 text-xs mt-4">If the button above does not work, copy and paste the following link into your browser:</p>' +
      '<p class="text-gray-600 text-xs break-all mt-2">' +
      '<a href="' +
      verificationLink +
      '" class="text-blue-500 underline">' +
      verificationLink +
      "</a>" +
      "</p>" +
      "</div>" +
      '<div class="bg-gray-100 text-center text-gray-500 text-xs py-4">' +
      "<p>If you did not create an account, please ignore this email.</p>" +
      "</div>" +
      "</div>" +
      "</body>" +
      "</html>";

    const mailOptions = {
      from: env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Please verify your email by clicking on the following link: ${verificationLink}`,
      html: htmlContent,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export { EmailService };
