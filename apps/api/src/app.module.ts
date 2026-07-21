import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PasswordResetRequestsModule } from './password-reset-requests/password-reset-requests.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, PasswordResetRequestsModule],
})
export class AppModule {}
