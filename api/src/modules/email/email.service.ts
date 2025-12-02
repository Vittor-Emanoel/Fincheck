import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import * as React from 'react';
import { Resend } from 'resend';
import InviteEmail from './templates/invite-email';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendInvite(email: string, inviterName: string) {
    const inviteLink = `${process.env.WEB_HOST}/register?email=${email}`;

    const html = await render(
      React.createElement(InviteEmail, { inviterName, inviteLink }),
    );
    console.log('Generated HTML:', html);

    try {
      await this.resend.emails.send({
        from: 'Fincheck <onboarding@resend.dev>',
        to: email,
        subject: `${inviterName} te convidou para compartilhar uma conta no Fincheck`,
        html,
      });
    } catch (error) {
      console.error('Error sending email', error);
    }
  }
}
