import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HubAuthController } from './hub-auth.controller';
import { HubAuthService } from './hub-auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [HubAuthController],
  providers: [HubAuthService],
})
export class HubAuthModule {}
