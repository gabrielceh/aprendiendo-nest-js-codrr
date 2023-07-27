import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthBodyDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  // Inyectamos el AuthService
  constructor(private readonly authServive: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: AuthBodyDTO) {
    const userValidate = await this.authServive.validateUser(
      username,
      password,
    );

    if (!userValidate) {
      throw new UnauthorizedException('Data no valida');
    }
    const jwt = await this.authServive.generateJWT(userValidate);

    return jwt;
  }
}
