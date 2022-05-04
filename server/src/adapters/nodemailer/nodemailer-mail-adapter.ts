import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "165a8aacba4656",
        pass: "bba79372a6136c"
    }
});

export class NoodemailerMailAdapter implements MailAdapter {
    // constructor(private nodemailer: Nodemailer) { }

    async sendMail({ subject, body }: SendMailData): Promise<void> {

        await transport.sendMail({
            from: "Equipe DRO TECH <io@feedwidget.com>",
            to: 'Danilo Ryan Oliveira <daniloryanoliveira7@hotmail.com>',
            subject,
            html: body
        })
    }
}