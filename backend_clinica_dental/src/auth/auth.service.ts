import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { OdontologosService } from 'src/odontologos/odontologos.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Odontologo } from 'src/odontologos/entities/odontologo.entity';

@Injectable()
export class AuthService {
  constructor(
    private odontologoService: OdontologosService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const { email, clave } = authLoginDto;
    const emailOk = await this.odontologoService.validate(email, clave);

    const payload = { sub: emailOk.id };
    const access_token = await this.getAccessToken(payload);

    return { ...emailOk, access_token };
  }

  // esto es un método privado que hace uso del servicio de JWT para firmar un token
  async getAccessToken(payload) {
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_TOKEN,
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
    return accessToken;
  }
  // este método recibe un payload y lo valida con el servicio de odontologos
  async verifyPayload(payload: JwtPayload): Promise<Odontologo> {
    let usuario: Odontologo;

    try {
        usuario = await this.odontologoService.findOne(payload.sub);
    } catch {
      throw new UnauthorizedException(`Odontologo inválido: ${payload.sub}`);
    }

    return usuario;
  }
}