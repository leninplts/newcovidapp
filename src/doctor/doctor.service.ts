import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from './doctor.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { DoctorInput } from './doctor.input';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(DoctorEntity)
        private readonly doctorRepository: Repository<DoctorEntity>,
    ) { }

    async findAll(): Promise<DoctorEntity[]> {
        return this.doctorRepository.find();
    }

    getUserById(_id: string) {
        return this.doctorRepository.findOne({ _id });
    }

    getDoctorByEmail(email: string) {
        return this.doctorRepository.findOne({ email });
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    createToken({ _id, nombres, apellidos, usuario, email, password, celular, especialidad }: DoctorEntity) {
        return jwt.sign({ _id, nombres, apellidos, usuario, email, password, celular, especialidad }, 'secret');
    }

    async create(input: DoctorInput): Promise<DoctorEntity> {
        const doctor = new DoctorEntity();
        const hashedPassword = await bcrypt.hash(input.password, 10);

        const splitnombre = input.nombres.split(' ');
        const splitapellido = input.apellidos.split(' ');

        const usuario = splitnombre[0] + splitapellido[0];

        console.log(usuario);
        doctor._id = uuidv4();
        doctor.nombres = input.nombres;
        doctor.apellidos = input.apellidos;
        doctor.usuario = usuario;
        doctor.email = input.email;
        doctor.password = hashedPassword;
        doctor.celular = input.celular;
        doctor.especialidad = input.especialidad;
        return this.doctorRepository.save(doctor);
    }
}
