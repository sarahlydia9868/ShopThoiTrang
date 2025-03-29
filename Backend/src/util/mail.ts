import nodemailer from "nodemailer";
import config from "./config";

interface IOptions {
  email: string;
  subject: string;
  html: string;
}

export const sendMail = async (options: IOptions) => {
    const transporter = nodemailer.createTransport({
      service: config.SMPT_SERVICE,
      secure: true,
      auth: {
        user: config.SMPT_MAIL,
        pass: config.SMPT_PASSWORD,
      },
    });

    const mailOptions = {
      from: config.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
};
