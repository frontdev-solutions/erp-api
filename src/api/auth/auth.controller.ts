import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto';
import { Public } from 'src/decotator/public.decotator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // post auth/login
  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('login-sales')
  loginSales(@Body() dto: LoginDto) {
    return this.authService.loginSales(dto);
  }
}
