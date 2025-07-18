import { Controller, Get } from '@nestjs/common';
import { QueryService } from './query.service';

@Controller('query')
export class QueryController {
    constructor(private readonly queryService: QueryService) { }

    @Get('programas')
    getUniqueProgramNames() {
        return this.queryService.getUniqueProgramNames();
    }
    // Aquí se agregarán los endpoints del recurso query
} 