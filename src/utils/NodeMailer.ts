import nodemailer, { Transporter } from 'nodemailer';
import config from '../config';
interface EmailOptions {
  email: string;
  subject: string;
  text: string;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: Number(config.EMAIL_PORT),
    secure: true,
    auth: {
      user: config.EMAIL_USERNAME,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'E-shop App <mohamedhassan32023@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
