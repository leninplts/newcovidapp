import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TerapiaEntity } from './terapia.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TerapiaInput } from './terapia.input';
import { DoctorUserInput } from './doctoruser.input';

@Injectable()
export class TerapiaService {
    constructor(
        @InjectRepository(TerapiaEntity)
        private readonly terapiaRepository: Repository<TerapiaEntity>,
    ) { }

    async findAll(): Promise<TerapiaEntity[]> {
        return this.terapiaRepository.find();
    }

    async create(input: TerapiaInput): Promise<TerapiaEntity> {
        const terapia = new TerapiaEntity();
        const date = new Date();

        const registeredTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();

        terapia._id = uuidv4();
        terapia.doctorid = input.doctorid;
        terapia.docnombres = input.docnombres;
        terapia.docapellidos = input.docapellidos;
        terapia.userid = input.userid;
        terapia.nombres = input.nombres;
        terapia.apellidos = input.apellidos;
        terapia.dni = input.dni;
        terapia.tratamiento = input.tratamiento;
        terapia.reqevaluacion = input.reqevaluacion;
        terapia.examenes = input.examenes;
        terapia.atencionpoeremergencia = input.atencionpoeremergencia;
        terapia.daralta = input.daralta;
        terapia.horaregistro = registeredTime;
        console.log(terapia);
        return this.terapiaRepository.save(terapia);
    }

    async terapias({ doctorid, userid }: DoctorUserInput): Promise<TerapiaEntity[]> {

        const terapias = await this.terapiaRepository.find({ doctorid, userid });

        console.log(terapias);

        return terapias;
    }
}
