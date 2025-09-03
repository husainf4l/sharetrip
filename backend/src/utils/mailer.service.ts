import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  async sendEmailVerification(email: string, payload: any) {
    // Implement SMTP templated email send in production.
    console.log(`[mailer] sendEmailVerification to ${email}`, payload);
    return true;
  }

  async sendPasswordReset(email: string, payload: any) {
    console.log(`[mailer] sendPasswordReset to ${email}`, payload);
    return true;
  }
}
