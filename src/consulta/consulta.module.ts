import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaResolver } from './consulta.resolver';
import { ConsultaEntity } from './consulta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultaEntity])],
  providers: [ConsultaService, ConsultaResolver]
})
export class ConsultaModule { }
