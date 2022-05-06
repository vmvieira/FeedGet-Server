import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e9b17cb4b8b9db',
    pass: '7c8f09b3209a07',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe FeedGet <teste@feedget.com',
      to: 'Vitor Machado Vieira <vmvieira55@gmail.com',
      subject,
      html: body,
    });
  }
}
