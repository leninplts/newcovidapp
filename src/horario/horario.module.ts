import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioResolver } from './horario.resolver';
import { HorarioEntity } from './horario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HorarioEntity]),
    UserModule,
    DoctorModule
  ],
  providers: [HorarioService, HorarioResolver],
  exports: [HorarioService]
})
export class HorarioModule { }
