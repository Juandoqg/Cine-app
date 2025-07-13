import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PeliculasModule } from './interfaces/modules/peliculas.module';
import { AuthModule } from './interfaces/modules/auth.module';

import { SalasModule } from './interfaces/modules/salas.module';
import { FuncionesModule } from './interfaces/modules/funciones.module';

import { JwtStrategy } from './infraestructure/strategies/jwt.strategy';
import { UploadModule } from './interfaces/modules/upload.module';
import { TipoPagoModule } from './interfaces/modules/tipo-pago.module';
import { VentasModule } from './interfaces/modules/venta.module';
import { MailModule } from './interfaces/modules/mail.module';
import { UsuarioModelDto } from './application/dto/UsuarioModelDto';
import { UsuariosModule } from './interfaces/modules/usuarios.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),

    PeliculasModule,
    AuthModule,
    SalasModule,
    FuncionesModule,
    UploadModule,
    MailModule,
    TipoPagoModule,
    VentasModule,
    UsuariosModule
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
