import nodeMailer from 'nodemailer';
import sendGrid from 'nodemailer-sendgrid-transport';
export class NodeMailer {
  static initiateTransport() {
    return nodeMailer.createTransport(
      sendGrid({
        auth: {
          api_key: 'SENDGRID_PASSWORD',
        },
      }),
    );
  }
  static sendMail(data: {
    to: [string];
    subject: string;
    html: string;
  }): Promise<any> {
    return NodeMailer.initiateTransport().sendMail({
      from: 'mohamed.azoz20010@gmail.com',
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  }
}
