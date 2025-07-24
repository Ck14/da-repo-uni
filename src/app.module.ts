import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataService } from './data/data.service';
import { DataController } from './data/data.controller';
import { HttpModule } from '@nestjs/axios';
import { DataModule } from './data/data.module';
import { QueryModule } from './query/query.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    HttpModule,
    DataModule,
    QueryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
