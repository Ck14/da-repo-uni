import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataService } from './data/data.service';
import { DataController } from './data/data.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, HttpModule],
  controllers: [AppController, DataController],
  providers: [AppService, DataService],
})
export class AppModule { }
