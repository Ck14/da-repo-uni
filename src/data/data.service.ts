import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DataService implements OnModuleInit {
    private data: any = null;
    private readonly dataFile = join(__dirname, '../../data.json');
    private readonly apiUrl = 'https://datos.minfin.gob.gt/api/action/datastore_search';
    private readonly apiBody = {
        resource_id: '85587118-152d-4613-bee0-d01d85ebdb9d',
        filters: {
            codigoEntidad: 12100401,
        },
    };

    constructor(private readonly httpService: HttpService) { }

    async onModuleInit() {
        // Al iniciar el módulo, intenta cargar el archivo si existe
        this.loadDataFromFile();
    }

    async fetchAndStoreData() {
        const response = await firstValueFrom(
            this.httpService.post(this.apiUrl, this.apiBody, {
                headers: { 'Content-Type': 'application/json' },
            })
        );
        this.data = response.data;
        writeFileSync(this.dataFile, JSON.stringify(this.data, null, 2), 'utf8');
    }

    loadDataFromFile() {
        if (existsSync(this.dataFile)) {
            this.data = JSON.parse(readFileSync(this.dataFile, 'utf8'));
        }
    }

    getData() {
        // Si no hay datos en memoria, intenta cargar del archivo
        if (!this.data) {
            this.loadDataFromFile();
        }
        return this.data;
    }
}
