import { Module } from '@nestjs/common';
import { UsertestService } from './usertest.service';
import { UsertestResolver } from './usertest.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTestEntity } from './usertest.entity';
import { HorarioModule } from '../horario/horario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTestEntity]),
    HorarioModule
  ],
  providers: [UsertestService, UsertestResolver],
})
export class UsertestModule { }
