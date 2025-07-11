import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from 'src/infraestructure/mail/mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('confirm-purchase')
  sendPurchase(@Body() body: any) {
    return this.mailService.sendPurchaseConfirmation(body.to, {
      name: body.name,
      movie: body.movie,
      tickets: body.tickets,
      total: body.total,
      status: body.status,
    });
  }
}
