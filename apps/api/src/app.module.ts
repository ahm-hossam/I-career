import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { EmployerAuthModule } from './employer-auth/employer-auth.module';
import { EventsModule } from './events/events.module';
import { HubAuthModule } from './hub-auth/hub-auth.module';
import { PasswordResetRequestsModule } from './password-reset-requests/password-reset-requests.module';
import { ProgramsModule } from './programs/programs.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PasswordResetRequestsModule,
    HubAuthModule,
    EmployerAuthModule,
    ProgramsModule,
    ArticlesModule,
    EventsModule,
    UploadsModule,
  ],
})
export class AppModule {}
