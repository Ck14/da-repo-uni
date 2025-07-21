import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataService implements OnModuleInit {
    private data: any = null;
    private readonly dataFile = join(__dirname, '../../data.json');
    private readonly apiUrl: string;
    private readonly resourceId: string;
    private readonly codigoEntidad: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.apiUrl = this.configService.get<string>('API_URL') || '';
        this.resourceId = this.configService.get<string>('RESOURCE_ID') || '';
        this.codigoEntidad = this.configService.get<string>('CODIGO_ENTIDAD') || '';
    }

    private get apiBody() {
        return {
            resource_id: this.resourceId,
            limit: 32000,
            filters: {
                codigoEntidad: this.codigoEntidad,
            },
        };
    }

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
