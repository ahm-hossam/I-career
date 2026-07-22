import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HubSessionGuard } from '../common/guards/hub-session.guard';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService, HubSessionGuard],
})
export class ProgramsModule {}
