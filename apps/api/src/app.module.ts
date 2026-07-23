import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { DashboardAuthModule } from './dashboard-auth/dashboard-auth.module';
import { DashboardUsersModule } from './dashboard-users/dashboard-users.module';
import { EmployerAuthModule } from './employer-auth/employer-auth.module';
import { EventsModule } from './events/events.module';
import { PasswordResetRequestsModule } from './password-reset-requests/password-reset-requests.module';
import { ProgramFormsModule } from './program-forms/program-forms.module';
import { ProgramsModule } from './programs/programs.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PasswordResetRequestsModule,
    EmployerAuthModule,
    DashboardAuthModule,
    DashboardUsersModule,
    ProgramsModule,
    ProgramFormsModule,
    ArticlesModule,
    EventsModule,
    UploadsModule,
  ],
})
export class AppModule {}
