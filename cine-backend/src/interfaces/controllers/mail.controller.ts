import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MailService } from 'src/infraestructure/mail/mail.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/infraestructure/guards/roles.guard';
import { Roles } from 'src/infraestructure/decorators/roles.decorator';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('confirm-purchase')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'cliente')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar correo de confirmación de compra' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: 'cliente@email.com' },
        movie: { type: 'string', example: 'Titanic' },
        fecha: { type: 'string', example: '2025-07-15' },
        hora: { type: 'string', example: '18:00' },
        tickets: { type: 'number', example: 2 },
        total: { type: 'number', example: 30000 },
        status: { type: 'string', example: 'Pagado' },
      },
      required: ['to', 'movie', 'fecha', 'hora', 'tickets', 'total', 'status'],
    },
  })
  @ApiResponse({ status: 201, description: 'Correo enviado con éxito' })
  @ApiResponse({ status: 403, description: 'Acceso no autorizado' })
  sendPurchase(@Body() body: any) {
    return this.mailService.sendPurchaseConfirmation(body.to, {
      movie: body.movie,
      fecha: body.fecha,
      hora: body.hora,
      tickets: body.tickets,
      total: body.total,
      status: body.status,
    });
  }
}
