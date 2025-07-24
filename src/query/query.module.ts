import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { ProgramaService } from './programa.service';
import { ObraService } from './obra.service';
import { ProyectoService } from './proyecto.service';
import { ActividadService } from './actividad.service';
import { RenglonService } from './renglon.service';
import { EstadisticaService } from './estadistica.service';
import { DataModule } from '../data/data.module';

@Module({
    imports: [DataModule],
    controllers: [QueryController],
    providers: [ProgramaService, ObraService, ProyectoService, ActividadService, RenglonService, EstadisticaService],
})
export class QueryModule { } 