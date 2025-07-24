import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { ProyectoTotalDto } from './dto/proyecto-total.dto';

@Injectable()
export class ProyectoService {
    constructor(private readonly dataService: DataService) { }

    getProyectosWithTotals(codigoPrograma: number): ProyectoTotalDto[] {
        const data = this.dataService.getData();
        if (!data || !data.result || !Array.isArray(data.result.records)) {
            return [];
        }

        const proyectosMap = new Map<number, ProyectoTotalDto>();

        const filtrados = data.result.records.filter((record: any) => record.codigoPrograma === codigoPrograma);

        for (const record of filtrados) {
            const { codigoProyecto, proyecto, codigoPrograma, programa, asignado, modificado, vigente, devengado, pagado } = record;
            const codigo = codigoProyecto ?? 0;
            const nombre = proyecto || 'No tiene proyecto';

            if (!proyectosMap.has(codigo)) {
                proyectosMap.set(codigo, {
                    codigoProyecto: codigo,
                    proyecto: nombre,
                    codigoPrograma,
                    programa,
                    asignado: 0,
                    modificado: 0,
                    vigente: 0,
                    devengado: 0,
                    pagado: 0,
                });
            }

            const proyectoTotal = proyectosMap.get(codigo)!;
            proyectoTotal.asignado += asignado || 0;
            proyectoTotal.modificado += modificado || 0;
            proyectoTotal.vigente += vigente || 0;
            proyectoTotal.devengado += devengado || 0;
            proyectoTotal.pagado += pagado || 0;
        }

        return Array.from(proyectosMap.values()).sort((a, b) => a.proyecto.localeCompare(b.proyecto));
    }
} 