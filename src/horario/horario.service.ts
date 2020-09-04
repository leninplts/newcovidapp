import { Injectable } from '@nestjs/common';
import { HorarioEntity, DiasHoras } from './horario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HorarioInput } from './horario.input';
import { v4 as uuidv4 } from 'uuid';
import { DoctorService } from '../doctor/doctor.service';


@Injectable()
export class HorarioService {
    constructor(
        private readonly doctorService: DoctorService,
        @InjectRepository(HorarioEntity)
        private readonly horarioRepository: Repository<HorarioEntity>,
    ) { }

    async findAll(): Promise<HorarioEntity[]> {
        const date = new Date();
        const hoursstring = date.getHours() + '.' + date.getMinutes();
        const hours = parseFloat(hoursstring);
        console.log(hours);
        console.log(typeof (hours));

        return this.horarioRepository.find();
    }

    async getUserById(_id: string) {
        return this.doctorService.getUserById(_id);
    }

    async create(input: HorarioInput): Promise<HorarioEntity> {
        const horario = new HorarioEntity();

        const doctor = await this.getUserById(input.doctorid);

        horario._id = uuidv4();
        horario.doctorid = doctor._id
        horario.nombres = doctor.nombres;
        horario.apellidos = doctor.apellidos;
        horario.diashoras = new DiasHoras();
        horario.diashoras.dia = input.diashoras.dia;
        horario.diashoras.inicio = input.diashoras.inicio;
        horario.diashoras.fin = input.diashoras.fin;
        // return horario;
        return this.horarioRepository.save(horario);
    }

    async getHorariosById(doctorid: string): Promise<HorarioEntity[]> {
        const allHorarios = await this.horarioRepository.find();
        console.log(doctorid);

        const horarios = await this.horarioRepository.find({ doctorid });
        console.log(horarios);
        return horarios;
    }
}
