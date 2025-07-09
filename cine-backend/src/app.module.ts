import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PeliculasModule } from './infraestructure/peliculas/peliculas.module';
import { AuthModule } from './infraestructure/auth/auth.module';

import { SalasModule } from './infraestructure/salas/salas.module';
import { FuncionesModule } from './infraestructure/funciones/funciones.module';

import { JwtStrategy } from './infraestructure/strategies/jwt.strategy';
import { UploadModule } from './infraestructure/uploads/upload.module';


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
    UploadModule

    // otros módulos...
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
