import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { RenglonTotalDto } from './dto/renglon-total.dto';

@Injectable()
export class RenglonService {
    constructor(private readonly dataService: DataService) { }

    getRenglonesWithTotals(
        codigoPrograma: number,
        codigoProyecto: number,
        codigoActividad: number,
        codigoObra: number
    ): RenglonTotalDto[] {
        const data = this.dataService.getData();
        if (!data || !data.result || !Array.isArray(data.result.records)) {
            return [];
        }

        const renglonesMap = new Map<number, RenglonTotalDto>();

        const filtrados = data.result.records.filter((record: any) =>
            record.codigoPrograma === codigoPrograma &&
            record.codigoProyecto === codigoProyecto &&
            record.codigoActividad === codigoActividad &&
            record.codigoObra === codigoObra
        );

        for (const record of filtrados) {
            const {
                codigoRenglon, renglon,
                codigoPrograma, programa,
                codigoProyecto, proyecto,
                codigoActividad, actividad,
                codigoObra, obra,
                asignado, modificado, vigente, devengado, pagado
            } = record;
            const codigo = codigoRenglon ?? 0;
            const nombre = renglon || 'No tiene renglon';
            const nombreObra = obra || 'No tiene obra';

            if (!renglonesMap.has(codigo)) {
                renglonesMap.set(codigo, {
                    codigoRenglon: codigo,
                    renglon: nombre,
                    codigoPrograma,
                    programa,
                    codigoProyecto,
                    proyecto,
                    codigoActividad,
                    actividad,
                    codigoObra,
                    Obra: nombreObra,
                    asignado: 0,
                    modificado: 0,
                    vigente: 0,
                    devengado: 0,
                    pagado: 0,
                });
            }

            const renglonTotal = renglonesMap.get(codigo)!;
            renglonTotal.asignado += asignado || 0;
            renglonTotal.modificado += modificado || 0;
            renglonTotal.vigente += vigente || 0;
            renglonTotal.devengado += devengado || 0;
            renglonTotal.pagado += pagado || 0;
        }

        return Array.from(renglonesMap.values()).sort((a, b) => a.renglon.localeCompare(b.renglon));
    }
} 