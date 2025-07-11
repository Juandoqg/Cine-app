import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPurchaseConfirmation(
    to: string,
    data: {
      movie: string;
      fecha : string;
      hora : string;
      tickets: number;
      total: number;
      status: string;
    },
  ) {
    await this.mailerService.sendMail({
      to,
      subject: 'Confirmación de compra',
      template: 'purchase-confirmation',
      context: data,
    });
  }
}
