import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { DataModule } from '../data/data.module';

@Module({
    imports: [DataModule],
    controllers: [QueryController],
    providers: [QueryService],
})
export class QueryModule { } 