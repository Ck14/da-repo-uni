import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { ProgramaTotalDto } from './dto/programa-total.dto';

@Injectable()
export class ProgramaService {
    constructor(private readonly dataService: DataService) { }

    getUniqueProgramNames(): string[] {
        const data = this.dataService.getData();
        if (!data || !data.result || !Array.isArray(data.result.records)) {
            return [];
        }
        const programas: string[] = data.result.records
            .map((r: any) => r.programa)
            .filter((p: any): p is string => typeof p === 'string');

        // Devolver solo nombres únicos y ordenados alfabéticamente
        return Array.from(new Set(programas)).sort();
    }

    getProgramasWithTotals(): ProgramaTotalDto[] {
        const data = this.dataService.getData();
        if (!data || !data.result || !Array.isArray(data.result.records)) {
            return [];
        }

        const programasMap = new Map<number, ProgramaTotalDto>();

        for (const record of data.result.records) {
            const { codigoPrograma, programa, asignado, modificado, vigente, devengado, pagado } = record;

            if (!programasMap.has(codigoPrograma)) {
                programasMap.set(codigoPrograma, {
                    codigoPrograma,
                    programa,
                    asignado: 0,
                    modificado: 0,
                    vigente: 0,
                    devengado: 0,
                    pagado: 0,
                });
            }

            const programaTotal = programasMap.get(codigoPrograma)!;
            programaTotal.asignado += asignado || 0;
            programaTotal.modificado += modificado || 0;
            programaTotal.vigente += vigente || 0;
            programaTotal.devengado += devengado || 0;
            programaTotal.pagado += pagado || 0;
        }

        return Array.from(programasMap.values()).sort((a, b) => a.programa.localeCompare(b.programa));
    }
} 