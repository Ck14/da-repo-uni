import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { ActividadTotalDto } from './dto/actividad-total.dto';

@Injectable()
export class ActividadService {
    constructor(private readonly dataService: DataService) { }

    getActividadesWithTotals(codigoPrograma: number, codigoProyecto: number): ActividadTotalDto[] {
        const data = this.dataService.getData();
        if (!data || !data.result || !Array.isArray(data.result.records)) {
            return [];
        }

        const actividadesMap = new Map<number, ActividadTotalDto>();

        const filtrados = data.result.records.filter((record: any) =>
            record.codigoPrograma === codigoPrograma && record.codigoProyecto === codigoProyecto
        );

        for (const record of filtrados) {
            const { codigoActividad, actividad, codigoPrograma, programa, codigoProyecto, proyecto, asignado, modificado, vigente, devengado, pagado } = record;
            const codigo = codigoActividad ?? 0;
            const nombre = actividad || 'No tiene actividad';
            const nombreProyecto = proyecto || 'No tiene proyecto';

            if (!actividadesMap.has(codigo)) {
                actividadesMap.set(codigo, {
                    codigoActividad: codigo,
                    actividad: nombre,
                    codigoPrograma,
                    programa,
                    codigoProyecto,
                    proyecto: nombreProyecto,
                    asignado: 0,
                    modificado: 0,
                    vigente: 0,
                    devengado: 0,
                    pagado: 0,
                });
            }

            const actividadTotal = actividadesMap.get(codigo)!;
            actividadTotal.asignado += asignado || 0;
            actividadTotal.modificado += modificado || 0;
            actividadTotal.vigente += vigente || 0;
            actividadTotal.devengado += devengado || 0;
            actividadTotal.pagado += pagado || 0;
        }

        return Array.from(actividadesMap.values()).sort((a, b) => a.actividad.localeCompare(b.actividad));
    }
} 