import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
      console.log("JWT strategy in Didy party !")
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:  String(process.env.JWT_SECRET),
    });
  }

  async validate(payload: any) {
      console.log("JWT strategy in Didy party !")
    return payload;
  }
}