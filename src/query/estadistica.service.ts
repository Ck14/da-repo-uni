import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { ProgramaEstadisticaDto } from './dto/programa-estadistica.dto';

@Injectable()
export class EstadisticaService {
    constructor(private readonly dataService: DataService) { }

    getTop5ProgramasMenorEjecucion(): ProgramaEstadisticaDto[] {
        const data = this.dataService.getData();
        if (!data || !data.result || !Array.isArray(data.result.records)) {
            return [];
        }

        const programasMap = new Map<number, ProgramaEstadisticaDto>();

        for (const record of data.result.records) {
            const { codigoPrograma, programa, vigente, devengado } = record;
            if (!programasMap.has(codigoPrograma)) {
                programasMap.set(codigoPrograma, {
                    codigoPrograma,
                    programa,
                    vigente: 0,
                    devengado: 0,
                    porcentajeEjecucion: 0,
                });
            }
            const p = programasMap.get(codigoPrograma)!;
            p.vigente += vigente || 0;
            p.devengado += devengado || 0;
        }

        // Calcular porcentaje de ejecución
        for (const p of programasMap.values()) {
            p.porcentajeEjecucion = p.vigente > 0 ? (p.devengado / p.vigente) * 100 : 0;
        }

        // Ordenar por mayor vigente y menor porcentaje de ejecución
        const top5 = Array.from(programasMap.values())
            .sort((a, b) => {
                if (b.vigente !== a.vigente) {
                    return b.vigente - a.vigente; // mayor vigente primero
                }
                return a.porcentajeEjecucion - b.porcentajeEjecucion; // menor porcentaje primero
            })
            .slice(0, 5);

        return top5;
    }
} 