import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { ObraTotalDto } from './dto/obra-total.dto';

@Injectable()
export class ObraService {
    constructor(private readonly dataService: DataService) { }

    getObrasByParams(codigoPrograma: number, codigoProyecto: number, codigoActividad: number): ObraTotalDto[] {
        const data = this.dataService.getData();
        if (!data || !data.result || !Array.isArray(data.result.records)) {
            return [];
        }

        const obrasFiltradas = data.result.records.filter(
            (record: any) =>
                record.codigoPrograma === codigoPrograma &&
                record.codigoProyecto === codigoProyecto &&
                record.codigoActividad === codigoActividad
        );

        const obrasMap = new Map<number, ObraTotalDto>();

        for (const record of obrasFiltradas) {
            const { codigoObra, obra, programa, codigoPrograma, codigoProyecto, codigoActividad, asignado, modificado, vigente, devengado, pagado } = record;

            if (!obrasMap.has(codigoObra)) {
                obrasMap.set(codigoObra, {
                    codigoObra,
                    Obra: obra || 'No tiene obra',
                    codigoPrograma,
                    programa,
                    codigoProyecto,
                    codigoActividad,
                    asignado: 0,
                    modificado: 0,
                    vigente: 0,
                    devengado: 0,
                    pagado: 0,
                });
            }

            const obraTotal = obrasMap.get(codigoObra)!;
            obraTotal.asignado += asignado || 0;
            obraTotal.modificado += modificado || 0;
            obraTotal.vigente += vigente || 0;
            obraTotal.devengado += devengado || 0;
            obraTotal.pagado += pagado || 0;
        }

        return Array.from(obrasMap.values()).sort((a, b) => a.Obra.localeCompare(b.Obra));
    }
} 