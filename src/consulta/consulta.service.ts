import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultaEntity } from './consulta.entity';
import { Repository } from 'typeorm';
import { ConsultaInput } from './consulta.input';
import { v4 as uuidv4 } from 'uuid';
import { DoctorUserInput } from './doctoruser.input';

@Injectable()
export class ConsultaService {
    constructor(
        @InjectRepository(ConsultaEntity)
        private readonly consultaRepository: Repository<ConsultaEntity>,
    ) { }

    async findAll(): Promise<ConsultaEntity[]> {
        return this.consultaRepository.find();
    }

    async create(input: ConsultaInput): Promise<ConsultaEntity> {
        const consulta = new ConsultaEntity();
        const date = new Date();

        const registeredTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();

        consulta._id = uuidv4();
        consulta.doctorid = input.doctorid;
        consulta.userid = input.userid;
        consulta.fecha = input.fecha;
        consulta.atendido = input.atendido;
        consulta.horaregistro = registeredTime;
        return this.consultaRepository.save(consulta);
    }

    async misConsultas({ doctorid, userid }: DoctorUserInput): Promise<ConsultaEntity[]> {

        const diagnosticos = await this.consultaRepository.find({ doctorid, userid });

        console.log(diagnosticos);

        return diagnosticos;
    }
}
