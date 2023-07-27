import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';

// lo declaramos como global ya que se usaran los servicios en otras partes
@Global()
@Module({
  // importamos el UserModule y el UserSevice
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
