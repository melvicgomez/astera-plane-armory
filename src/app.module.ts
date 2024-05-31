import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './modules/environment.module';
import { DatabaseModule } from './modules/database.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CompaniesModule } from './companies/companies.module';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsService } from './contacts/contacts.service';
import { ProjectsModule } from './projects/projects.module';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    CompaniesModule,
    ContactsModule,
    ProjectsModule,
    PropertiesModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    UsersService,
    AuthService,
    ContactsService,
  ],
})
export class AppModule {}
