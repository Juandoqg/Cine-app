import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const raw = req?.cookies?.['access_token'];
            const token = typeof raw === 'string' ? raw : raw?.token; // <- esto es clave
            console.log('Token extraído:', token);
            return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret')!,
    });
  }

  async validate(payload: any) {
    // Este método debe devolver algo, se inyectará como req.user
    console.log('Payload en validate:', payload);
    return payload;
  }
}
