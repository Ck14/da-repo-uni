import { Controller, Get, Post } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) { }

    // Endpoint para obtener los datos cargados en memoria
    @Get()
    getData() {
        return this.dataService.getData();
    }

    // Endpoint para forzar la descarga y guardado del JSON desde el API externa
    @Post('fetch')
    async fetchAndStoreData() {
        await this.dataService.fetchAndStoreData();
        return { message: 'Datos descargados y guardados correctamente.' };
    }
}
