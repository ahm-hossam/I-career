import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DashboardAuthController } from './dashboard-auth.controller';
import { DashboardAuthService } from './dashboard-auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [DashboardAuthController],
  providers: [DashboardAuthService],
})
export class DashboardAuthModule {}
