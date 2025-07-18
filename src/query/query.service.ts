import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class QueryService {
    constructor(private readonly dataService: DataService) { }

    getUniqueProgramNames(): string[] {
        const data = this.dataService.getData();
        if (!data || !data.result || !Array.isArray(data.result.records)) {
            return [];
        }
        const programas = data.result.records.map((r: any) => r.programa);
        // Devolver solo nombres únicos
        return Array.from(new Set(programas));
    }
    // Aquí irá la lógica del servicio para el recurso query
} 