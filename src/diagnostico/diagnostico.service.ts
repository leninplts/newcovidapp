import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiagnosticoEntity } from './diagnostico.entity';
import { Repository } from 'typeorm';
import { DiagnosticoInput } from './diagnostico.input';
import { v4 as uuidv4 } from 'uuid';
import { DoctorUserInput } from './doctoruser.input';

@Injectable()
export class DiagnosticoService {
    constructor(
        @InjectRepository(DiagnosticoEntity)
        private readonly diagnosticoRepository: Repository<DiagnosticoEntity>,
    ) { }

    async findAll(): Promise<DiagnosticoEntity[]> {
        return this.diagnosticoRepository.find();
    }

    async create(input: DiagnosticoInput): Promise<DiagnosticoEntity> {
        const diagnostico = new DiagnosticoEntity();
        const date = new Date();

        const registeredTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();

        diagnostico._id = uuidv4();
        diagnostico.doctorid = input.doctorid;
        diagnostico.userid = input.userid;
        diagnostico.nombres = input.nombres;
        diagnostico.apellidos = input.apellidos;
        diagnostico.dni = input.dni;
        diagnostico.casocovid = input.casocovid;
        diagnostico.factorderiesgo = input.factorderiesgo;
        diagnostico.horaregistro = registeredTime;
        return this.diagnosticoRepository.save(diagnostico);
    }

    async diagnosticos({ doctorid, userid }: DoctorUserInput): Promise<DiagnosticoEntity[]> {

        const diagnosticos = await this.diagnosticoRepository.find({ doctorid, userid });

        console.log(diagnosticos);

        return diagnosticos;
    }
}
