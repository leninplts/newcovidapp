import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserTestEntity, MiPaciente } from './usertest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTestInput } from './usertest.input';
import { v4 as uuidv4 } from 'uuid';
import { HorarioService } from '../horario/horario.service';

@Injectable()
export class UsertestService {
    constructor(
        private readonly horarioService: HorarioService,
        @InjectRepository(UserTestEntity)
        private readonly userTestRepository: Repository<UserTestEntity>,
    ) { }

    async findAll(): Promise<UserTestEntity[]> {
        return await this.userTestRepository.find();
    }

    async miPaciente(doctorid: string): Promise<MiPaciente[]> {

        const users = await this.userTestRepository.find({ doctorid });
        const pacientes = users.map((miPaciente) => {
            const paciente = new MiPaciente();
            paciente.userid = miPaciente.uderid;
            paciente.nombres = miPaciente.nombres;
            paciente.apellidos = miPaciente.apellidos;
            paciente.distrito = miPaciente.distrito;
            paciente.genero = miPaciente.genero;
            paciente.evaluacion = "moderado";
            return paciente;
        })

        console.log(pacientes);

        // for (let i = 0; i < users.length; i++) {
        //     const paciente = new MiPaciente();
        //     paciente.userid = users[i].uderid;
        //     paciente.nombres = users[i].nombres;
        //     paciente.apellidos = users[i].apellidos;
        //     paciente.distrito = users[i].distrito;
        //     paciente.genero = users[i].genero;
        //     paciente.evaluacion = users[i].sinsintomas;
        // }

        // console.log(users);
        return pacientes;
    }

    async create(input: UserTestInput): Promise<UserTestEntity> {
        const test = new UserTestEntity();
        const date = new Date();

        const doctors = await this.horarioService.findAll();
        // console.log(doctors);

        const hoursstring = date.getHours() + '.' + date.getMinutes();
        const registeredTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();
        const now = parseFloat(hoursstring);
        console.log(now);

        const dias = [
            'domingo',
            'lunes',
            'martes',
            'miércoles',
            'jueves',
            'viernes',
            'sábado',
            'domingo',
        ];
        const numeroDia = date.getDay();
        const nombreDia = dias[numeroDia];
        console.log("Nombre de día de la semana: ", nombreDia);

        const findDoctor = doctors.map((doc) => {
            const inicio = parseFloat(doc.diashoras.inicio);
            const fin = parseFloat(doc.diashoras.fin);
            if (doc.diashoras.dia == nombreDia) {
                if (inicio < now && fin > now)
                    return doc;
            }
            // console.log(doc.doctorid);
        });

        let myDoc;

        for (let i = 0; i < findDoctor.length; i++) {
            if (findDoctor[i] != undefined) {
                myDoc = findDoctor[i];
                break;
            }
        }

        // console.log(myDoc.length);
        console.log(myDoc.doctorid);

        test._id = uuidv4();
        test.uderid = input.userid;
        test.dni = input.dni;
        test.nombres = input.nombres;
        test.apellidos = input.apellidos;
        test.genero = input.genero;
        test.edad = input.edad;
        test.region = input.region;
        test.provincia = input.provincia;
        test.distrito = input.distrito;
        test.direccion = input.direccion;
        test.oficio = input.oficio;
        test.peso = input.peso;
        test.talla = input.talla;
        test.respiracion = input.respiracion;
        test.gestante = input.gestante;
        test.enfermedad = input.enfermedad;
        test.enfermedaddetalle = input.enfermedaddetalle;
        test.alergia = input.alergia;
        test.alergiadetalle = input.alergiadetalle;
        test.alcohol = input.alcohol;
        test.medicacion = input.medicacion;
        test.medicaciondetalle = input.medicaciondetalle;
        test.diagnostico = input.diagnostico;
        test.diagnosticodetalle = input.diagnosticodetalle;
        test.contactocovid = input.contactocovid;
        test.fiebre = input.fiebre;
        test.tos = input.tos;
        test.fatiga = input.fatiga;
        test.disminucionapetito = input.disminucionapetito;
        test.dificultadrespiracion = input.dificultadrespiracion;
        test.malestargeneral = input.malestargeneral;
        test.malestarfechainicio = input.malestarfechainicio;
        test.otros = input.otros;
        test.otrosdetalle = input.otrosdetalle;
        test.sinsintomas = input.sinsintomas;
        test.sensaciondeahogamiento = input.sensaciondeahogamiento;
        test.desorientacion = input.desorientacion;
        test.fiebremayordosdias = input.fiebremayordosdias;
        test.dolorespechoespalda = input.dolorespechoespalda;
        test.coloraciondelabios = input.coloraciondelabios;
        test.actividadesdiarias = input.actividadesdiarias;
        test.personasdeconvivencia = input.personasdeconvivencia;
        test.doctorid = myDoc.doctorid;
        test.horaregistro = registeredTime;

        console.log(registeredTime);

        return await this.userTestRepository.save(test);
        // console.log("test ingresado: ");
        // console.log(createdTest);
    }
}
