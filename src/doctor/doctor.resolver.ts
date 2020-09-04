import { DoctorLoginInput } from './doctor_login.input';
import { DoctorInput } from './doctor.input';
import { DoctorAuthGuard } from './doctor_auth.guard';
import { DoctorService } from './doctor.service';
import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { DoctorEntity } from './doctor.entity';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';

@Resolver('Doctor')
export class DoctorResolver {
    constructor(private readonly doctorService: DoctorService) { }

    @Query(() => [DoctorEntity])
    @UseGuards(new DoctorAuthGuard)
    meDoctor(@Context('doctor') doctor: DoctorEntity) {
        console.log(doctor);
        return doctor;
    }

    @Query(() => [DoctorEntity])
    async doctors() {
        return this.doctorService.findAll();
    }

    @Mutation(() => String)
    async createDoctor(@Args('input') input: DoctorInput) {
        let doctor = await this.doctorService.getDoctorByEmail(input.email);
        if (doctor) {
            throw new HttpException('Usuario ya existe', HttpStatus.UNAUTHORIZED);
        }
        doctor = await this.doctorService.create(input);
        return this.doctorService.createToken(doctor);
    }

    @Query(() => DoctorEntity)
    async loginDoctor(@Args('input') input: DoctorLoginInput) {
        let doctor = await this.doctorService.getDoctorByEmail(input.email);
        if (!doctor) {
            throw new HttpException('Usuario no registrado', HttpStatus.UNAUTHORIZED);
        }
        const confirmPassword = await this.doctorService.comparePassword(input.password, doctor.password);
        if (!confirmPassword) {
            throw new HttpException('Credenciales invalidos', HttpStatus.UNAUTHORIZED);
        }
        return this.doctorService.createToken(doctor);
    }
}
