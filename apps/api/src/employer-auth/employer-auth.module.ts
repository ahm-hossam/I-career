import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployerAuthController } from './employer-auth.controller';
import { EmployerAuthService } from './employer-auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [EmployerAuthController],
  providers: [EmployerAuthService],
})
export class EmployerAuthModule {}
