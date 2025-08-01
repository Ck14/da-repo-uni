import { Controller, Get, Query } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ObraService } from './obra.service';
import { ProyectoService } from './proyecto.service';
import { ActividadService } from './actividad.service';
import { RenglonService } from './renglon.service';
import { EstadisticaService } from './estadistica.service';

@Controller('query')
export class QueryController {
    constructor(
        private readonly programaService: ProgramaService,
        private readonly obraService: ObraService,
        private readonly proyectoService: ProyectoService,
        private readonly actividadService: ActividadService,
        private readonly renglonService: RenglonService,
        private readonly estadisticaService: EstadisticaService,
    ) { }

    @Get('programas/nombres')
    getUniqueProgramNames() {
        return this.programaService.getUniqueProgramNames();
    }

    @Get('programas')
    getProgramasWithTotals() {
        return this.programaService.getProgramasWithTotals();
    }

    @Get('obras')
    getObrasByParams(
        @Query('codigoPrograma') codigoPrograma: string,
        @Query('codigoProyecto') codigoProyecto: string,
        @Query('codigoActividad') codigoActividad: string
    ) {
        return this.obraService.getObrasByParams(
            parseInt(codigoPrograma, 10),
            parseInt(codigoProyecto, 10),
            parseInt(codigoActividad, 10)
        );
    }

    @Get('proyectos')
    getProyectosWithTotals(@Query('programa') codigoPrograma: string) {
        return this.proyectoService.getProyectosWithTotals(parseInt(codigoPrograma, 10));
    }

    @Get('actividades')
    getActividadesWithTotals(@Query('codigoPrograma') codigoPrograma: string, @Query('codigoProyecto') codigoProyecto: string) {
        return this.actividadService.getActividadesWithTotals(parseInt(codigoPrograma, 10), parseInt(codigoProyecto, 10));
    }

    @Get('renglones')
    getRenglonesWithTotals(
        @Query('codigoPrograma') codigoPrograma: string,
        @Query('codigoProyecto') codigoProyecto: string,
        @Query('codigoActividad') codigoActividad: string,
        @Query('codigoObra') codigoObra: string
    ) {
        return this.renglonService.getRenglonesWithTotals(
            parseInt(codigoPrograma, 10),
            parseInt(codigoProyecto, 10),
            parseInt(codigoActividad, 10),
            parseInt(codigoObra, 10)
        );
    }

    @Get('estadisticas/top5-programas-menor-ejecucion')
    getTop5ProgramasMenorEjecucion() {
        return this.estadisticaService.getTop5ProgramasMenorEjecucion();
    }
} 