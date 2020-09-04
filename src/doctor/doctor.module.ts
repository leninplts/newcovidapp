import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorResolver } from './doctor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorEntity])
  ],
  providers: [DoctorService, DoctorResolver],
  exports: [DoctorService]
})
export class DoctorModule { }
